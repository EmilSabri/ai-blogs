/* eslint-disable no-constant-condition */
// @ts-nocheck
/* 
    broker.js
    1. The broker will be responsible for managing the queue of requests to the OpenAI API.
    2. It will also be responsible for managing the rate limit of the API.
    3. It will also be responsible for managing the billing of the API.

*/

import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } from '$env/static/private'
import { openai } from './openai'
import { Queue, Worker, QueueEvents } from 'bullmq';
import { articles } from '$lib/server/articles'
import { flow } from '$lib/server/redis'
import { outlineFunc } from './outline_job';
import { paragraphsFunc } from './paragraph_job';
import { promptFunc } from './prompt_job';


const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

const BROKER_QUEUE = 'BROKER_QUEUE'


// Open AI flow
export async function test() {
    return {ding: "dong"}
}

// Using Flow Jobs with sub children
// 1 Worker
// Took 26.832 seconds for 1 job = avg 26.832 seconds
// Took 196 seconds for 9 jobs = avg 21 seconds

// 2 Workers
// Took 77 seconds for 6 jobs = avg 12 seconds per job
// Took 135 seconds for 10 jobs = avg 13.5 seconds per job

// Took 107 seconds for 7 jobs = avg 15.2 seconds per job

// new Worker('prompt', promptFunc, {connection: connection})
// new Worker('outline-paragraphs', paragraphsFunc, {connection: connection})
// new Worker('outline', outlineFunc, {connection: connection})

// new Worker('prompt', promptFunc, {connection: connection})
// new Worker('outline-paragraphs', paragraphsFunc, {connection: connection})
// new Worker('outline', outlineFunc, {connection: connection})


// Process Step Jobs
// 1 Worker
// Took 28.881 secs for 1 job = avg 28.881
// 5 Workers
// Took 31.512 secs for 5 jobs = avg 6.3 seconds
// 10 Workers
// Took 27.858 secs for 10 jobs = avg 2.7 seconds
// Took 34.616 secs for 20 jobs = avg 1.73 seconds
const promptStepFunc = async (job) => {

    if (job.data.step === 0) {
        let resp = await outlineFunc(job)
        await job.update({...job.data, step: 1, body: resp })
    }

    if (job.data.step === 1) {
        let resp = await paragraphsFunc(job)
        await job.update({...job.data, step: 2, body: resp })
    }

    if (job.data.step === 2) {
        await promptFunc(job)
        await job.update({...job.data, step: 3 })
    }
}

new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})

new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})
new Worker('QUEUEBEE', promptStepFunc, {connection: connection})


// Keep getting ReplyError: ERR max number of clients reached
// Figure out way to keep track of number of # of clients and limit them
// Figure out way to gracefully catch this error and limit the number of workers

// How many clients does each worker use?
    // Seems to be 1 client per worker
// Is there a way to limit the number of clients?
    // Yes


// Todo - usage and billing limit
// Still unsure the best way to track number of tokens and the billing usage with these workers.
// Might need to implement a redis variable with a lock to keep track of the number of tokens used and
// cancel jobs if they are going to exceed the limit.