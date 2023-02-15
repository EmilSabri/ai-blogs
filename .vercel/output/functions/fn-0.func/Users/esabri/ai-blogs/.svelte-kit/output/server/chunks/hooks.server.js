import { Client } from "redis-om";
import Redlock from "redlock";
import Redis from "ioredis";
const DOMAIN = "brianfog.com";
const S3_ACCESS_KEY = "AKIAVLE6EAYWOJNIZKNW";
const S3_SECERET_KEY = "lbNeu3fCtJ6d6D76mpd2tah2qUpGCLRu/m98c9Wg";
const S3_REGION = "us-west-2";
const S3_BUCKET_ARTICLES = "semaglutide-articles";
const OPENAI_KEY = "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";
const REDIS_HOST = "redis-12246.c285.us-west-2-2.ec2.cloud.redislabs.com";
const REDIS_PORT = "12246";
const REDIS_USERNAME = "default";
const REDIS_PASSWORD = "fReCaJcHeOCAyjlynCjKgZxipBDmW5Yf";
const connection = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
const redisOm = new Client();
await redisOm.open(connection);
const ioRedis = new Redis(connection);
const redisLock = new Redlock(
  [ioRedis],
  {
    // The expected clock drift; for more details see:
    // http://redis.io/topics/distlock
    driftFactor: 0.01,
    // multiplied by lock ttl to determine drift time
    // The max number of times Redlock will attempt to lock a resource
    // before erroring.
    retryCount: 10,
    // the time in ms between attempts
    retryDelay: 200,
    // time in ms
    // the max time in ms randomly added to retries
    // to improve performance under high contention
    // see https://www.awsarchitectureblog.com/2015/03/backoff.html
    retryJitter: 200,
    // time in ms
    // The minimum remaining time on a lock before an extension is automatically
    // attempted with the `using` API.
    automaticExtensionThreshold: 500
    // time in ms
  }
);
const hooks_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ioRedis,
  redisLock,
  redisOm
}, Symbol.toStringTag, { value: "Module" }));
export {
  DOMAIN as D,
  OPENAI_KEY as O,
  REDIS_HOST as R,
  S3_ACCESS_KEY as S,
  S3_SECERET_KEY as a,
  S3_REGION as b,
  S3_BUCKET_ARTICLES as c,
  REDIS_PORT as d,
  REDIS_USERNAME as e,
  REDIS_PASSWORD as f,
  hooks_server as h,
  ioRedis as i,
  redisOm as r
};
