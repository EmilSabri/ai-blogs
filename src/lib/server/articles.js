// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client } from "$lib/server";
import { Readable } from "stream";

// Todo - Add functions to grab metadata file and another function to grab markdown file.
// This will reduce the potential errors around grabbing those files by having a function to grab either one of them.

// Todo add functions to upload metadata and markdown files

// Uploads to private bucket
async function upload(ContentType, Key, Body, prefix="private") {
    let file = ContentType === "application/json" ? JSON.stringify(Body) : Body
    const readable = Readable.from(file)

    const resp = await s3Client.uploadObject(S3_BUCKET_ARTICLES, prefix + "/" + Key, readable, ContentType, Buffer.byteLength(file))
    
    // Todo - Add error handling if S3 upload fails
    const body = {
        success: true,
    }
}

async function deleteObject(Key, prefix) {
    await s3Client.deleteObject(S3_BUCKET_ARTICLES, prefix + "/" + Key)
}

async function swapVisibility(ContentType, Key, Body, prefix) {
    const newPrefix = prefix === 'private' ? 'public' : 'private';

    await upload(ContentType, Key, Body, newPrefix)
    await deleteObject(Key, prefix)
}

async function noMarkdown(ContentType, Key, Body, prefix) {

    await upload(ContentType, Key, Body, 'no-markdown')
    await deleteObject(Key, prefix)
}

async function getArticle(domain, prefix, key) {
    const fullKey = `${domain}/${prefix}/${key}`
    console.log(fullKey)
    return s3Client.getObject(S3_BUCKET_ARTICLES, fullKey)
}

// Todo - 
// 1. Add pagination
// 2. Abliity to get all articles for sitemap.xml
async function getPublicArticles(domain, getMetaData = false, limit = 50, startAfter = undefined) {
    const prefix = `${domain}/public/`
    console.log(prefix)
    const articles = await s3Client.listObjects(getMetaData, limit, prefix, startAfter)
    return articles
}

async function getPrivateArticles(getMetaData = false, limit = 50) {
    const articles = await s3Client.listObjects(getMetaData, limit, 'private/')
    return articles
}


async function getRelatedArticles(domain, startAfter, limit) {
    const articles = await getPublicArticles(domain, true, limit, `${domain}/public/${startAfter}`)
    return articles
}

function calcFuncTime(func) {


    return async (...args) => {
        const startTime = Date.now()
        const resp = await func(...args)
        const endTime = Date.now() - startTime
        // console.log(`${func.name}()`, endTime / 1000, "seconds")
        return resp
    }
}

export const articles = {
    upload: calcFuncTime(upload),
    getPrivateArticles: calcFuncTime(getPrivateArticles),
    getPublicArticles: calcFuncTime(getPublicArticles),
    getArticle: calcFuncTime(getArticle),
    swapVisibility: calcFuncTime(swapVisibility),
    noMarkdown: calcFuncTime(noMarkdown),
    deleteObject: deleteObject,
    getRelatedArticles: calcFuncTime(getRelatedArticles),
}