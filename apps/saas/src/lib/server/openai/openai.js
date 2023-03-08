// @ts-nocheck
import { Configuration, OpenAIApi } from "openai";
import { ioRedis } from "../../../hooks.server";

const OPENAI_KEY = process.env.OPENAI_KEY;



const configuration = new Configuration({
    apiKey: OPENAI_KEY,
});

const openAiApi = new OpenAIApi(configuration);

// Constants for text completion
export const model_billing = .0200;  // Measured in $/1000 tokens
const model = 'text-davinci-003';
const max_tokens = 1500;
const temperature = 0.7;
const top_p = 1;
const frequency_penalty = 0.2;
const presence_penalty = 0;


async function call(prompt) {
  const body = {
    model: model,
    prompt: prompt,
    max_tokens: max_tokens,
    temperature: temperature,
    top_p: top_p,
    frequency_penalty: frequency_penalty,
    presence_penalty: presence_penalty,
  }

  try {
    const resp = await openAiApi.createCompletion(body);
    await updateUsage(resp.data.usage)
    return resp;
  } catch (error) {
    // Todo - Throw ERORR
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return error.response.data
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
          error: {
          message: 'An error occurred during your request.',
        }
      };
    }
  }
}

// TODO -
// 1. Track trailing 30 days of usage
// 2. Track total usage as a list of trailing 30 days usage = [month1_usage, month2_usage, ...]
async function updateUsage(usage) {
  await ioRedis.incrby('openai_total_tokens', usage.total_tokens)
  await ioRedis.incrby('openai_request_count', 1)
}

export const openai = {
    call,
}