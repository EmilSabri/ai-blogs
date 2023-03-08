// @ts-nocheck
import { Queue, Worker, QueueEvents } from 'bullmq';
import { openai } from './openai'


// export const outlineFunc = async (job) => {

/*
    job.data.body = {
        keyword: 'keyword',
    }
*/

export const outlineFunc = async (job) => {
    const startTime = Date.now()
    const keyword = job.data.body.keyword    
   
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
    const prompt = articleOutline(keyword)
    const resp = await openai.call(prompt)

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

function articleOutline(keyword) {
    return `Imagine you’re an expert doctor writing an article for a website.
    The website is about brain fog, remedies to brain fog, supplements, and general information related to brain fog.
    Write the outline to an article with these keywords "${keyword}".
    An outline has a title, description, and headers that structure the article.
    The description is brief typically 2 to 3 sentences long.
    The headers are less than 8 words. Every outline will have 5 to 8 headers.
    In the format of 
    Title: data
    Description: data
    Headers1:
    HeadersX:
    HeadersLast:`
}