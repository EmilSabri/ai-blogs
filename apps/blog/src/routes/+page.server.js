// @ts-nocheck
import { s3Client, articles } from "@aiblogs/db";

const articleLength = 10

export async function load({ url }) {
    let { host } = url

    if (host.includes('localhost') || host.includes('127.0.0.1')) {
        host = 'brianfog.com'
    }

    let siteData = {}
    let articlesMeta = []
    const key = `${host}/newsite.json`

    console.log("69", key, 'ayo', host)

    siteData = JSON.parse(await s3Client.getObject(key))
    articlesMeta = await articles.getPublicArticles(host, true, 20)

    const seentIt = {}
    articlesMeta.forEach(meta => {
        seentIt[meta.image.url] = {...meta, contentLink: meta.contentLink.toLowerCase()}
    });
    articlesMeta = (Object.values(seentIt)).slice(0, articleLength)
    
    return {
        host: host,
        siteData: siteData,
        articles: articlesMeta
    }
}