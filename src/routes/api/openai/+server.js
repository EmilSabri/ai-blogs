/* eslint-disable no-constant-condition */
// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { openai } from "$lib/server";

import { json } from "@sveltejs/kit";


const resp = `Title: What is Brain Fog?\n
Description: Brain fog is a condition that causes difficulty concentrating, confusion, and forgetfulness. It affects people of all ages and can have a significant impact on daily life. \n
Headers1: What is Brain Fog?\n
Headers2: Causes of Brain Fog\n
Headers3: Symptoms of Brain Fog\n
Headers4: Diagnosing Brain Fog\n
Headers5: Treatment and Prevention of Brain Fog\n
Headers6: Additional Resources\n asdlfjlasdjf`

let text3 = `Header1: What is Brain Fog?
Brain fog is a term used to describe feelings of confusion, forgetfulness, and lack of mental clarity. It can be caused by a variety of factors including stress, depression, certain medications, and chronic illness. Brain fog can be temporary or it can linger for months or even years. It can have a major impact on your quality of life and can cause you to feel sluggish, unfocused, and frustrated.

Header2: Causes of Brain Fog
There are many potential causes of brain fog, ranging from physical to psychological. Physical causes include hormonal changes associated with menstruation or menopause, thyroid disorders, poor nutrition, and sleep deprivation. Psychological causes include anxiety, depression, and stress. Brain fog can also be caused by certain medications or recreational drugs.

Header3: Symptoms of Brain Fog
Symptoms of brain fog vary from person to person, but typically include feelings of confusion, forgetfulness, difficulty concentrating, and lack of mental clarity. Other symptoms may include difficulty completing tasks, sluggishness throughout the day, and difficulty retaining new information. 

Header4: Treatments and Remedies for Brain Fog
In order to treat brain fog effectively it is important to identify the underlying cause. Treatment may include lifestyle modifications such as increasing physical activity, improving sleep habits, and developing stress management strategies. Additionally, certain supplements can be helpful in treating brain fog including omega-3 fatty acids and B vitamins. 

Header5: Supplements for Brain Fog
Certain supplements can be beneficial in treating symptoms of brain fog including omega-3 fatty acids, B vitamins, probiotics, and magnesium. Omega-3 fatty acids are essential for brain health as they help to improve cognitive function and reduce inflammation. B vitamins are essential for energy production and help to reduce fatigue and mental fog by increasing blood flow to the brain. Probiotics are beneficial for gut health which has been linked to improved cognitive function while magnesium helps to improve cognitive function and reduce fatigue. 

Header6: Conclusion
Brain fog is a common condition that can have a significant impact on quality of life. Understanding potential causes of brain fog can help you identify the underlying cause and determine which treatments or remedies may be most effective in treating your symptoms. Additionally, certain supplements can be beneficial in treating symptoms of brain fog and improving overall cognitive function.`



// Uploads an object to the bucket
export async function POST( event ) {
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
		contentLink: ""
    }

    const req = await event.request.json()

    let prompt = openai.articleOutline(req.keyword)
    const resp = await openai.generateArticle(prompt)
 

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

    prompt = openai.articleParagraphs(req.keyword, title, description, headers)
    const resp2 = await openai.generateArticle(prompt)
    text = resp2.data.choices[0].text

    const headers2 = [];
    i = 1;
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
    // console.log("---------------------------------")
    // console.log(text)
    // console.log(split_headings)
    // console.log("---------------------------------")
    
    

    const markdown = headers2.map(pair => {
        return `## ${pair.h.trim().split(':')[1]}\n\n${pair.p}\n\n`
    }).join('\n')

    const body = {
        markdown: markdown,
        metadata: metadata
    }

    return json(body)
}