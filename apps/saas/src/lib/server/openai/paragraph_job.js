// @ts-nocheck
/* eslint-disable no-constant-condition */
import { openai } from './openai'

export const paragraphsFunc = async (job) => {
    const params = job.data.body

    const prompt = articleParagraphs(params.keyword, params.title, params.description, params.headers)
    const resp2 = await openai.call(prompt)
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
}

function articleParagraphs(keyword, title, description, headers) {
    return `Imagine you’re an expert doctor writing an article for a website.
  The website is about brain fog, remedies to brain fog, supplements, and general information related to brain fog.
  Write the outline to an article with these keywords "${keyword}".
  ${title}
  ${description}
  ${headers.join('\n')}
  Now write a paragraph for each header1 to header${headers.length} that are 6 sentences long each.
  In the format of
  Header1: data
  paragraph1
  HeaderX:
  paragraphX
  HeaderLast:
  paragraphLast
  `
  }