// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client } from "$lib/server";

export async function GET({params}) {
    // const req = await event.request.json()
    const key = `${params.article_slug}/markdown.md`

    // const markdown = await s3Client.getObject(S3_BUCKET_ARTICLES, `${params.article_slug}/markdown.md`)
    // const metadata = await s3Client.getObject(S3_BUCKET_ARTICLES, `${params.article_slug}/metadata.json`)
    // const jsonObj = JSON.parse(metadata)
    // console.log("wtf", jsonObj)

    return {
        // markdown: markdown,
        // metadata: jsonObj
    };
}