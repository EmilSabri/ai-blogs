import "../../../../chunks/openai.js";
import "fs";
import "csv-parser";
import { a as articles } from "../../../../chunks/articles.js";
import { j as json } from "../../../../chunks/index.js";
async function GET() {
  const body = { body: "699696969" };
  return new Response(JSON.stringify(body));
}
async function POST(event) {
  const req = await event.request.json();
  articles.upload(req.ContentType, req.Key.toLowerCase(), req.Body, req.prefix);
  const body = {
    success: true
  };
  return json(body);
}
async function PUT(event) {
  const req = await event.request.json();
  if (req.noMarkdown) {
    articles.noMarkdown(req.ContentType, req.Key, req.Body, req.prefix);
  } else {
    articles.swapVisibility(req.ContentType, req.Key, req.Body, req.prefix);
  }
  const body = {
    success: true
  };
  return json(body);
}
export {
  GET,
  POST,
  PUT
};
