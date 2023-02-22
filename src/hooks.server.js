// @ts-nocheck
import { REDIS_HOST, REDIS_PASSWORD, REDIS_USERNAME, REDIS_PORT, SENDINBLUE_KEY} from "$env/static/private"

import { Client } from "redis-om"
import Redlock from "redlock"
import Redis from "ioredis";
import * as SibApiV3Sdk from 'sib-api-v3-sdk'


console.log(SibApiV3Sdk)
let defaultClient = SibApiV3Sdk.default.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SENDINBLUE_KEY;
export let apiInstance = new SibApiV3Sdk.default.ContactsApi();


const connection = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
export const redisOm = new Client()
await redisOm.open(connection)


export const ioRedis = new Redis(connection)
export const redisLock = new Redlock(
    [ioRedis],
    {

    // The expected clock drift; for more details see:
    // http://redis.io/topics/distlock
    driftFactor: 0.01, // multiplied by lock ttl to determine drift time

    // The max number of times Redlock will attempt to lock a resource
    // before erroring.
    retryCount: 10,

    // the time in ms between attempts
    retryDelay: 200, // time in ms

    // the max time in ms randomly added to retries
    // to improve performance under high contention
    // see https://www.awsarchitectureblog.com/2015/03/backoff.html
    retryJitter: 200, // time in ms

    // The minimum remaining time on a lock before an extension is automatically
    // attempted with the `using` API.
    automaticExtensionThreshold: 500, // time in ms
  }
    )

// https://github.com/redis/node-redis/blob/HEAD/docs/pub-sub.md
// Read up on redis pub sub ^^^