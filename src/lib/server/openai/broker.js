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
import { Queue, Worker, QueueEvents } from 'bullmq';
import { articles } from '$lib/server/articles'
import { flow } from '$lib/server/redis'

const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

const BROKER_QUEUE = 'BROKER_QUEUE'

const queue = new Queue(BROKER_QUEUE, { connection: connection })

const promptEvents = new QueueEvents('prompt', { connection: connection });
const paragraphEvents = new QueueEvents('outline-paragraphs', { connection: connection });
const outlineEvents = new QueueEvents('outline', { connection: connection });

promptEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`Job ${jobId} failed with reason ${failedReason}`);
})
paragraphEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`Job ${jobId} failed with reason ${failedReason}`);
})
outlineEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`Job ${jobId} failed with reason ${failedReason}`);
})



const retryOpts = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 500
    }
}

// Open AI flow
export async function test() {
    // const originalTree = await flow.add({
    //     name: 'prompt',
    //     queueName: 'prompt',
    //     data: {},
    //     children: [
    //         {
    //             name: 'outline-paragraphs',
    //             data: {},
    //             queueName: 'outline-paragraphs',
    //             opts: retryOpts,
    //             children: [
    //                 {
    //                     name: 'outline',
    //                     data: {keyword: "brain fog reddit"},
    //                     queueName: 'outline',
    //                     opts: retryOpts,
    //                 }
    //             ],
    //         }
    //     ]
    // })

    return {ding: "dong"}
}

const promptFunc = async (job) => {
    const childrenValues = await job.getChildrenValues()
    const params = Object.values(childrenValues)[0]

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
    const millis = Date.now() - params.startTime
    console.log(`Uploaded ${params.metadata.keyword} to S3 took: ${millis / 1000} secs`)
}

const paragraphsFunc = async (job) => {
    // Get children values
    const childrenValues = await job.getChildrenValues()
    const params = Object.values(childrenValues)[0]

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
        metadata: params.metadata,
        startTime: params.startTime
    }
    return body
    // Call open AI 
    // prompt = openai.articleParagraphs(params.keyword, params.title, params.description, params.headers)

}


const outlineFunc = async (job) => {
    const startTime = Date.now()
    const keyword = job.data.keyword
   
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
        console.log(`${keyword}`, "Rate limited, waiting 1 second")
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
        metadata: metadata,
        startTime: startTime
    }
    return body
}

// 1 Worker
// Took 26.832 seconds for 1 job = avg 26.832 seconds
// Took 196 seconds for 9 jobs = avg 21 seconds

// 2 Workers
// Took 77 seconds for 6 jobs = avg 12 seconds per job
// Took 135 seconds for 10 jobs = avg 13.5 seconds per job

new Worker('prompt', promptFunc, {connection: connection})
new Worker('outline-paragraphs', paragraphsFunc, {connection: connection})
new Worker('outline', outlineFunc, {connection: connection})

new Worker('prompt', promptFunc, {connection: connection})
new Worker('outline-paragraphs', paragraphsFunc, {connection: connection})
new Worker('outline', outlineFunc, {connection: connection})


// Keep getting ReplyError: ERR max number of clients reached
// when I add another set of workers (3)
// How many clients does each worker use?
// Is there a way to limit the number of clients?
// What is the correct limit?


// Todo - usage and billing limit
// Still unsure the best way to track number of tokens and the billing usage with these workers.
// Might need to implement a redis variable with a lock to keep track of the number of tokens used and
// cancel jobs if they are going to exceed the limit.