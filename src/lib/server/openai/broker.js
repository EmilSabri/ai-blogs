/* eslint-disable no-constant-condition */
// @ts-nocheck
/* 
    broker.js
    Todo - Should prolly rename this
*/

import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD, OPENAI_BILL_BUFFER, OPENAI_MAX_BILL } from '$env/static/private'
import { model_billing } from './openai'
import { BROKER_QUEUE } from '../redis';
import { createArticleFunc, calcMaxSteps } from './prompts';
import { Worker } from 'bullmq';
import { ioRedis } from '../../../hooks.server';


const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
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