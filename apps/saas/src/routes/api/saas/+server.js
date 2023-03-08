// @ts-nocheck
import { s3Client } from "@aiblogs/db"
import { S3_BUCKET_ARTICLES } from "$env/static/private"

export async function POST( event ) {
  
    const req = await event.request.json()

    const body = JSON.stringify(req)
    const key = req.domain.toLowerCase() + "/newsite.json"

    console.log('------------------')
    console.log(key)
    console.log(body)
    s3Client.uploadObject(S3_BUCKET_ARTICLES, key, body, "application/json", Buffer.byteLength(body))


    return new Response(JSON.stringify({success: true}))
}