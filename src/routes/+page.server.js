// @ts-nocheck
import { articles } from "$lib/server/articles"

export async function load() {

    // Todo - Get list of articles from redis
    let articlesMeta = await articles.getPublicArticles(true, 10)
    articlesMeta = articlesMeta.map((article) => { return {...article, contentLink: article.contentLink.toLowerCase()}})
    
    return {
        articles: articlesMeta,
    }
}