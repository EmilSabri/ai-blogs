// @ts-nocheck
import { articles } from "$lib/server/articles"

export async function load() {

    // Todo - Get list of articles from redis
    const articlesMeta = await articles.getPublicArticles(true, 10)
    
    return {
        articles: articlesMeta,
    }
}