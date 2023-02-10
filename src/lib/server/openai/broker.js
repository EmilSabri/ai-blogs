/* eslint-disable no-constant-condition */
// @ts-nocheck
/* 
    broker.js
    1. The broker will be responsible for managing the queue of requests to the OpenAI API.
    2. It will also be responsible for managing the rate limit of the API.
    3. It will also be responsible for managing the billing of the API.

*/

import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } from '$env/static/private'
import { openai } from './openai'
import { Queue, Worker, FlowProducer } from 'bullmq';
import { articles } from '$lib/server/articles'

const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

const BROKER_QUEUE = 'BROKER_QUEUE'

const queue = new Queue(BROKER_QUEUE, { connection: connection })
const flow = new FlowProducer({ connection })

const retryOpts = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 500
    }
}

// Open AI flow

export async function test() {
    const originalTree = await flow.add({
        name: 'prompt',
        queueName: 'prompt',
        data: {},
        children: [
            {
                name: 'outline-paragraphs',
                data: {},
                queueName: 'outline-paragraphs',
                opts: retryOpts,
                children: [
                    {
                        name: 'outline',
                        data: {keyword: "brain fog reddit"},
                        queueName: 'outline',
                        opts: retryOpts,
                    }
                ],
            }
        ]
    })

    return {ding: "dong"}
}

const promptFunc = async (job) => {
    const childrenValues = await job.getChildrenValues()
    const params = Object.values(childrenValues)[0]
    console.log('worker-prompt', params.metadata)
    console.log(params.markdown)

    // Send this data off to S3 bucket and article queue to be processed
    await articles.upload(
        `text/markdown`,
        `${params.metadata.contentLink}/markdown.md`,
        params.markdown
    )

    await articles.upload(
        'application/json', 
        `${params.metadata.contentLink}/metadata.json`, 
        params.metadata
    )
}

const workerPrompt = new Worker('prompt', promptFunc, {connection: connection})

const paragraphsFunc = async (job) => {
    // Get children values
    const childrenValues = await job.getChildrenValues()
    const params = Object.values(childrenValues)[0]
    console.log("work-paragraphs", params.keyword, params.title, params.description, params.headers)



    const prompt = openai.articleParagraphs(params.keyword, params.title, params.description, params.headers)
    const resp2 = await openai.generateArticle(prompt)
    const text = resp2.data.choices[0].text

    const headers2 = [];
    let i = 1;
    while (true) {
        let headerRegex = new RegExp(`Header${i}: (.+)\n(.+)`);
        let temp = text.match(headerRegex);

        if (temp == null) {
            break;
        }
     
        let h = temp[0].split('\n')[0]
        let p = temp[0].split('\n')[1]
        headers2.push({h: h, p: p})
        i += 1;
    }

    const split_headings = headers2.map(header => header.h.split(':'))

    const markdown = headers2.map(pair => {
        return `## ${pair.h.trim().split(':')[1]}\n\n${pair.p}\n\n`
    }).join('\n')


    const body = {
        markdown: markdown,
        metadata: params.metadata
    }
    return body
    // Call open AI 
    // prompt = openai.articleParagraphs(params.keyword, params.title, params.description, params.headers)

}

const workerParagraphs = new Worker('outline-paragraphs', paragraphsFunc, {connection: connection})


const outlineFunc = async (job) => {
    const keyword = job.data.keyword
    console.log('worker-outline', keyword)
   
    const metadata = {
        title: 'title',
		description: 'asdf',
		image: {
			url: 'https://static.techspot.com/images2/news/bigimage/2017/09/2017-09-29-image-9.jpg',
			alt: 'Test Image'
		},
		author: 'Brian R. Foggy',
		date: new Date().toLocaleDateString('en-US'),
		tags: [],
		contentLink: "",
        keyword: keyword
    }


    // Mock data to simulate OpenAI response
    const prompt = openai.articleOutline(keyword)
    const resp = await openai.generateArticle(prompt)

    if (resp === 'error') {
        // eslint-disable-next-line no-undef
        await worker.rateLimit(1000);
        throw Worker.RateLimitError();
    }

    // Parse data
    let text = resp.data.choices[0].text
    const titleRegex = /Title: (.+)\n/;
    const descriptionRegex = /Description: (.+)\n/;

    const title = text.match(titleRegex);
    const description = text.match(descriptionRegex)[1];
    metadata['title'] = title[1];

    const allowedCharsRegex = /[a-zA-Z0-9-]+/g;
    metadata['contentLink'] = metadata['title'].trim().replaceAll(' ', '-').match(allowedCharsRegex).join('')
    metadata['description'] = description

    const headers = [];
    let i = 1;
    while (true) {
        let headerRegex = new RegExp(`Headers${i}: (.+)\n`);
        let temp = text.match(headerRegex);
        
        if (temp == null) {
            break;
        }
        headers.push(temp[0])
        i += 1;
    }

    const body = {
        keyword: keyword,
        title: title,
        description: description,
        headers: headers,
        metadata: metadata
    }
    return body
}

const workerOutline = new Worker('outline', outlineFunc, {connection: connection})



// Todo - usage and billing limit
// Still unsure the best way to track number of tokens and the billing usage with these workers.
// Might need to implement a redis variable with a lock to keep track of the number of tokens used and
// cancel jobs if they are going to exceed the limit.