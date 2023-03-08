/*
    prompts.js
    1. prompts.js will manage all the various prompts for our application such as
        - Article explainers consisting of articleOutline() and articleParagraphs()
        - Article listicles
        - Article reviews
        and so on
    2. The prompts.js will return articles
*/

import { outlineFunc } from "./outline_job"
import { paragraphsFunc } from "./paragraph_job"
import { promptFunc } from "./prompt_job"

export enum ArticleTypes {
    EXPLAINER = 'EXPLAINER',
    LISTICLE = 'LISTICLE',
    REVIEW = 'REVIEW',
}

/*
    job.data = {
        step: 0,        // Which step in the prompt process we're in
        articleType: ArticleTypes.EXPLAINER,    // The type of article we're generating
        // The body of the job which is from the last step we returned from
        body: {key1: value1, key2: value2, ...}, 
    }

*/

export async function createArticleFunc(job) {
    switch (job.data.articleType) {
        case ArticleTypes.EXPLAINER:
            return await createExplainArticle(job)
        case ArticleTypes.LISTICLE:
            // return await createListicleArticle(params)
            console.log('createArticleFunc() - Listicle not implemented yet')
            break
        case ArticleTypes.REVIEW:
            // return await createListicleArticle(params)
            console.log('createArticleFunc() - Review not implemented yet')
            break;
        default:
            console.log('createArticleFunc() - Invalid article type')
            break;
    }
}

export function calcMaxSteps(articleType: ArticleTypes) {
    switch (articleType) {
        case ArticleTypes.EXPLAINER:
            return 3
    }
}
// Either put all the functions in this file or in another single file
async function createExplainArticle(job) {
    switch (job.data.step) {
        case 0:
            return await outlineFunc(job)
        case 1:
            return await paragraphsFunc(job)
        case 2:
            return await promptFunc(job)
    }
}