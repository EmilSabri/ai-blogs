// @ts-nocheck
// import { S3_BUCKET_ARTICLES } from "$env/static/private";
// import { s3Client } from "$lib/server";

// export async function GET() {
//     const req = await event.request.json()

//     const markdown = await s3Client.getObject(bucket, `${params.article_slug}/markdown.md`)
//     const metadata = await s3Client.getObject(bucket, `${params.article_slug}/metadata.json`)
//     const jsonObj = JSON.parse(jsonFile)

//     return {
//         markdown: markdown,
//         metadata: jsonObj
//     };
// }