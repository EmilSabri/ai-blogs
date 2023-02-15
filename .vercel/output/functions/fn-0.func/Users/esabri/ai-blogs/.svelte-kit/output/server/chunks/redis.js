import { Schema, Entity } from "redis-om";
import { r as redisOm, R as REDIS_HOST, d as REDIS_PORT, e as REDIS_USERNAME, f as REDIS_PASSWORD } from "./hooks.server.js";
import { Queue, Worker } from "bullmq";
import "./openai.js";
import "fs";
import "csv-parser";
import "stream";
const ArticleTypes = {
  EXPLAINER: "EXPLAINER"
  // LISTICLE: 'LISTICLE',
  // REVIEW: 'REVIEW',
};
const KEYWORD_QUEUE = "NEW_KEYWORD_QUEUE-619";
const BROKER_QUEUE = "BROKER_QUEUE";
const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD
};
const queue = new Queue(KEYWORD_QUEUE, { connection });
const retryOpts = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 500
  }
};
const testQueue = new Queue(BROKER_QUEUE, { connection });
const promptFlow = async (job) => {
  const keyword = job.data.keyword;
  const jobData = {
    step: 0,
    articleType: ArticleTypes.EXPLAINER,
    body: {
      keyword
    },
    retries: 0
  };
  testQueue.add("testJob", jobData, retryOpts);
  console.log(`Start promptFlow - ${keyword}`);
};
new Worker(KEYWORD_QUEUE, promptFlow, { connection });
class Article extends Entity {
}
class Markdown extends Entity {
}
const markdownSchema = new Schema(Markdown, {
  contentLink: { type: "string" },
  markdown: { type: "string" }
});
const articleSchema = new Schema(Article, {
  title: { type: "text" },
  description: { type: "text" },
  date: { type: "date" },
  author: { type: "string" },
  imageUrl: { type: "string", indexed: false },
  imageAlt: { type: "string", indexed: false },
  tags: { type: "string[]" },
  contentLink: { type: "string" },
  keyword: { type: "string", indexed: false }
});
const articleRepository = redisOm.fetchRepository(articleSchema);
await articleRepository.createIndex();
const markdownRepository = redisOm.fetchRepository(markdownSchema);
await markdownRepository.createIndex();
export {
  articleRepository as a,
  markdownRepository as m,
  queue as q
};
