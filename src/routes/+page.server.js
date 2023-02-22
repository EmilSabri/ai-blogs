// @ts-nocheck
import { articles } from "$lib/server/articles"

export async function load() {

    // Todo - Get list of articles from redis
    let articlesMeta = await articles.getPublicArticles(true, 20)

    // Remove articles with duplicate image urls
    const seentIt = {}
    articlesMeta.forEach(meta => {
        seentIt[meta.image.url] = {...meta, contentLink: meta.contentLink.toLowerCase()}
    });
    const test = Object.values(seentIt)
    
    return {
        articles: test.slice(0, 10)
    }
}