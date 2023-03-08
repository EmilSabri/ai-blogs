
// essentials
import { Queue, Worker } from 'bullmq'
import { ArticleTypes } from '../openai/prompts'

export const KEYWORD_QUEUE = 'NEW_KEYWORD_QUEUE-619'
export const BROKER_QUEUE = 'BROKER_QUEUE'

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

export const queue = new Queue(KEYWORD_QUEUE, { connection: connection })

const retryOpts = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 500
    }
}

const testQueue = new Queue(BROKER_QUEUE , { connection: connection })

const promptFlow = async (job) => {
    const keyword = job.data.keyword
    const jobData = {
        step: 0,
        articleType: ArticleTypes.EXPLAINER,
        body: {
            keyword: keyword,
        },
        retries: 0
    }
    testQueue.add('testJob', jobData, retryOpts)
}

// Workers
new Worker(KEYWORD_QUEUE, promptFlow, {connection: connection})