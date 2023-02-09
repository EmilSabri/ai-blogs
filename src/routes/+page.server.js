/*
    Loads the file names from the S3 bucket.

    Concerns -
    Will need to gather images in the future to display a thumbnail for each
    blog post. This will require a different approach to loading the files.
*/

// @ts-nocheck
import { s3Client } from "$lib/server/s3client"

export async function load() {
    // s3 list objects in bucket with credentials
    const articlesMeta = await s3Client.listObjects(true, 10)

    return {
        articles: articlesMeta,
    }
}