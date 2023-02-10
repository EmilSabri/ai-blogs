// @ts-nocheck
import { OPENAI_KEY, OPENAI_MAX_BILL } from "$env/static/private";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });

const openAiApi = new OpenAIApi(configuration);

// Constants for text completion
const model_billing = .0200;  // Measured in $/1000 tokens
const model = 'text-davinci-003';
const max_tokens = 1500;
const temperature = 0.7;
const top_p = 1;
const frequency_penalty = 0.2;
const presence_penalty = 0;

// Todo - Track usage for billing 

async function generateArticle(prompt) {
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
    return resp;
  } catch (error) {
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


function articleOutline(keyword) {
    return `Imagine you’re an expert doctor writing an article for a website.
    The website is about brain fog, remedies to brain fog, supplements, and general information related to brain fog.
    Write the outline to an article with these keywords "${keyword}".
    An outline has a title, description, and headers that structure the article.
    The description is brief typically 2 to 3 sentences long.
    The headers are less than 8 words. Every outline will have 5 to 8 headers.
    In the format of 
    Title: data
    Description: data
    Headers1:
    HeadersX:
    HeadersLast:`
}

function articleParagraphs(keyword, title, description, headers) {
  return `Imagine you’re an expert doctor writing an article for a website.
The website is about brain fog, remedies to brain fog, supplements, and general information related to brain fog.
Write the outline to an article with these keywords "${keyword}".
${title}
${description}
${headers.join('\n')}
Now write a paragraph for each header1 to header${headers.length} that are 6 sentences long each.
In the format of
Header1: data
paragraph1
HeaderX:
paragraphX
HeaderLast:
paragraphLast
`
}

function articlePrompt(keyword) {
    return `Imagine an you’re expert doctor writing an article for a website.
The website is about brain fog for people who experience brain fog.
Each article will have a title, description, and content.
The content typically has short headers, less than 6 words, describing each paragraph and the paragraphs should be about 3 to 4 sentences long.
The article’s content should have around 500 words in it. Now give me an article based on these keywords "${keyword}".`
}

export const openai = {
    generateArticle,
    articleOutline,
    articleParagraphs,
}