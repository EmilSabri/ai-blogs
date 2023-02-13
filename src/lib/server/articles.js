// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client } from "$lib/server";
import { Readable } from "stream";


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

async function getArticle(prefix, key) {
    return s3Client.getObject(S3_BUCKET_ARTICLES, prefix + "/" + key)
}

async function getPublicArticles(getMetaData = false, limit = 50) {
    const articles = await s3Client.listObjects(getMetaData, limit, 'public/')
    return articles
}

async function getPrivateArticles(getMetaData = false, limit = 50) {
    const articles = await s3Client.listObjects(getMetaData, limit, 'private/')
    return articles
}

function calcFuncTime(func) {


    return async (...args) => {
        const startTime = Date.now()
        const resp = await func(...args)
        const endTime = Date.now() - startTime
        console.log(`${func.name}()`, endTime / 1000, "seconds")
        return resp
    }
}


export const articles = {
    upload: calcFuncTime(upload),
    getPrivateArticles: calcFuncTime(getPrivateArticles),
    getPublicArticles: calcFuncTime(getPublicArticles),
    getArticle: calcFuncTime(getArticle),
    swapVisibility: calcFuncTime(swapVisibility)
    
}