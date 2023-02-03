// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client } from "$lib/server";

import { json } from "@sveltejs/kit";
import { Readable } from "stream";




// List the objects in the bucket
export async function GET() {
    const articles = await s3Client.listObjects(true)

    const body = { body: articles };
    console.log( body)
    return new Response(JSON.stringify(body))
}

// Uploads an object to the bucket
export async function POST( event ) {
    const req = await event.request.json()
    console.log(req)

    let file = req.ContentType === "application/json" ? JSON.stringify(req.Body) : req.Body
    const readable = Readable.from(file)

    const resp = s3Client.uploadObject(S3_BUCKET_ARTICLES, req.Key, readable, req.ContentType, Buffer.byteLength(file))

    const body = {
        success: true,
    }

    return json(body)
}