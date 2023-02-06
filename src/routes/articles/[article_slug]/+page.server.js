// @ts-nocheck
import { S3_BUCKET_ARTICLES } from "$env/static/private";
import { s3Client } from "$lib/server";


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const key = `${params.article_slug}`

    // const markdown = await s3Client.getObject(S3_BUCKET_ARTICLES, `${key}/markdown.md`)
    // const metadata = await s3Client.getObject(S3_BUCKET_ARTICLES, `${key}/metadata.json`)
    // const metaJson = JSON.parse(metadata)

    const markdown = {}
    const metaJson = {}
  return {
        markdown: markdown,
        metadata: metaJson
    };
}