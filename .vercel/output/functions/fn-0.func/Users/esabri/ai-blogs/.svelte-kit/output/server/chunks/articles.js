import { c as S3_BUCKET_ARTICLES } from "./hooks.server.js";
import { s as s3Client } from "./openai.js";
import "fs";
import "csv-parser";
import { Readable } from "stream";
async function upload(ContentType, Key, Body, prefix = "private") {
  let file = ContentType === "application/json" ? JSON.stringify(Body) : Body;
  const readable = Readable.from(file);
  await s3Client.uploadObject(S3_BUCKET_ARTICLES, prefix + "/" + Key, readable, ContentType, Buffer.byteLength(file));
}
async function deleteObject(Key, prefix) {
  await s3Client.deleteObject(S3_BUCKET_ARTICLES, prefix + "/" + Key);
}
async function swapVisibility(ContentType, Key, Body, prefix) {
  const newPrefix = prefix === "private" ? "public" : "private";
  await upload(ContentType, Key, Body, newPrefix);
  await deleteObject(Key, prefix);
}
async function noMarkdown(ContentType, Key, Body, prefix) {
  await upload(ContentType, Key, Body, "no-markdown");
  await deleteObject(Key, prefix);
}
async function getArticle(prefix, key) {
  return s3Client.getObject(S3_BUCKET_ARTICLES, prefix + "/" + key);
}
async function getPublicArticles(getMetaData = false, limit = 50) {
  const articles2 = await s3Client.listObjects(getMetaData, limit, "public/");
  return articles2;
}
async function getPrivateArticles(getMetaData = false, limit = 50) {
  const articles2 = await s3Client.listObjects(getMetaData, limit, "private/");
  return articles2;
}
function calcFuncTime(func) {
  return async (...args) => {
    const startTime = Date.now();
    const resp = await func(...args);
    const endTime = Date.now() - startTime;
    console.log(`${func.name}()`, endTime / 1e3, "seconds");
    return resp;
  };
}
const articles = {
  upload: calcFuncTime(upload),
  getPrivateArticles: calcFuncTime(getPrivateArticles),
  getPublicArticles: calcFuncTime(getPublicArticles),
  getArticle: calcFuncTime(getArticle),
  swapVisibility: calcFuncTime(swapVisibility),
  noMarkdown: calcFuncTime(noMarkdown),
  deleteObject
};
export {
  articles as a
};
