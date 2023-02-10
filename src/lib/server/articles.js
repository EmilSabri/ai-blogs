// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client } from "$lib/server";
import { Readable } from "stream";


async function upload(ContentType, Key, Body) {
    let file = ContentType === "application/json" ? JSON.stringify(Body) : Body
    const readable = Readable.from(file)

    const resp = await s3Client.uploadObject(S3_BUCKET_ARTICLES, Key, readable, ContentType, Buffer.byteLength(file))
    
    // Todo - Add error handling if S3 upload fails
    const body = {
        success: true,
    }
}


export const articles = {
    upload: upload
}