import { o as openai } from "../../../../chunks/openai.js";
import "fs";
import "csv-parser";
import "stream";
import { j as json } from "../../../../chunks/index.js";
async function POST(event) {
  const metadata = {
    title: "title",
    description: "asdf",
    image: {
      url: "https://static.techspot.com/images2/news/bigimage/2017/09/2017-09-29-image-9.jpg",
      alt: "Test Image"
    },
    author: "Brian R. Foggy",
    date: new Date().toLocaleDateString("en-US"),
    tags: [],
    contentLink: ""
  };
  const req = await event.request.json();
  let prompt = openai.articleOutline(req.keyword);
  const resp = await openai.call(prompt);
  let text = resp.data.choices[0].text;
  const titleRegex = /Title: (.+)\n/;
  const descriptionRegex = /Description: (.+)\n/;
  const title = text.match(titleRegex);
  const description = text.match(descriptionRegex)[1];
  metadata["title"] = title[1];
  const allowedCharsRegex = /[a-zA-Z0-9-]+/g;
  metadata["contentLink"] = metadata["title"].trim().replaceAll(" ", "-").match(allowedCharsRegex).join("");
  metadata["description"] = description;
  const headers = [];
  let i = 1;
  while (true) {
    let headerRegex = new RegExp(`Headers${i}: (.+)
`);
    let temp = text.match(headerRegex);
    if (temp == null) {
      break;
    }
    headers.push(temp[0]);
    i += 1;
  }
  prompt = openai.articleParagraphs(req.keyword, title, description, headers);
  const resp2 = await openai.call(prompt);
  text = resp2.data.choices[0].text;
  const headers2 = [];
  i = 1;
  while (true) {
    let headerRegex = new RegExp(`Header${i}: (.+)
(.+)`);
    let temp = text.match(headerRegex);
    if (temp == null) {
      break;
    }
    let h = temp[0].split("\n")[0];
    let p = temp[0].split("\n")[1];
    headers2.push({ h, p });
    i += 1;
  }
  headers2.map((header) => header.h.split(":"));
  const markdown = headers2.map((pair) => {
    return `## ${pair.h.trim().split(":")[1]}

${pair.p}

`;
  }).join("\n");
  const body = {
    markdown,
    metadata
  };
  return json(body);
}
export {
  POST
};
