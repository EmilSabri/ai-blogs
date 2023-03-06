// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client  } from "$lib/server";
import { articles } from "$lib/server/articles";

function equalsSaasHome(host) {
    return host === '127.0.0.1:5173' || host === 'localhost:5173';
}

const articleLength = 10

export async function load({ url }) {
    let { host } = url

    // If data.host !== SAAS page then grab site meta data
    host =  'brianfog.com' // url.host
    let siteData = {}
    let articlesMeta = []
    if (!equalsSaasHome(host)) {
        const key = `${host}/newsite.json`
        siteData = JSON.parse(await s3Client.getObject(S3_BUCKET_ARTICLES, key))
        articlesMeta = await articles.getPublicArticles(host, true, 20)
        // console.log(articlesMeta)

        // Remove articles with duplicate image urls
        const seentIt = {}
        articlesMeta.forEach(meta => {
            seentIt[meta.image.url] = {...meta, contentLink: meta.contentLink.toLowerCase()}
        });
        articlesMeta = (Object.values(seentIt)).slice(0, articleLength)
    }

    console.log(siteData)
    return {
        host: host,
        siteData: siteData,
        articles: articlesMeta
    }
}