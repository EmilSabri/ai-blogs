/* eslint-disable no-constant-condition */
// @ts-nocheck
/* 
    broker.js
    Todo - Should prolly rename this
*/

import { model_billing } from './openai'
import { createArticleFunc, calcMaxSteps } from './prompts';
import { Worker } from 'bullmq';
import { ioRedis } from '../../../hooks.server';

const BROKER_QUEUE = 'BROKER_QUEUE'     // Todo - put in shared redis package

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_PASSWORD = process.env.REDIS_PASSWORD
const OPENAI_BILL_BUFFER = process.env.OPENAI_BILL_BUFFER
const OPENAI_MAX_BILL = process.env.OPENAI_MAX_BILL

const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

// Figure out creating workers without needing to export function
export function test() {
    console.log('wtf)')
}

// Open AI flow
const promptStepFunc = async (job) => {
    // Calculate next usage billing 
    const token_usage = await ioRedis.get('openai_total_tokens')
    const request_count = await ioRedis.get('openai_request_count')
    // console.log("TOKEN USAGE", token_usage, "REQUEST COUNT", request_count)
    const curr_billing = (token_usage / 1000) * model_billing
    const next_usage_bill = (token_usage / request_count) / 1000 * model_billing

    // don't throw just check if it's greater than max - buffer and notify user
    if ( curr_billing + next_usage_bill*2 >= OPENAI_MAX_BILL - OPENAI_BILL_BUFFER ) {
        console.log("MAX BILLING REACHED")
    } else if ( curr_billing + next_usage_bill*2 >= OPENAI_MAX_BILL ) {
        // If next usage will be >= max then throw error
        console.log("BILLING REACHED MAXIMUM")
        throw new Error("BILLING REACHED MAXIMUM")
    }

    // Todo - If OpenAI request fails (too many requests or servers down)
    // Calculate exponential backoff by keeping track of the number of times 
    // tried in job.data.retries and using that in the backoff formula
    try {
        while (job.data.step < calcMaxSteps(job.data.articleType)) {
            let resp = await createArticleFunc(job)
            await job.update({...job.data, step: job.data.step + 1, body: resp })
        }
    } catch (err) {
        await job.update({...job.data, retries: job.data.retries + 1 })
        const backoff = (2 ** (job.data.retries)) * 1000 // delay = 1000ms = 1 second
        this.rateLimit(backoff)     // todo - Check if this works. Might fail on 'this'
        console.log("WORKER ERROR", err)
    }
}

new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})

new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})
new Worker(BROKER_QUEUE, promptStepFunc, {connection: connection})


// Keep getting ReplyError: ERR max number of clients reached
// Figure out way to keep track of number of # of clients and limit them
// Figure out way to gracefully catch this error and limit the number of workers