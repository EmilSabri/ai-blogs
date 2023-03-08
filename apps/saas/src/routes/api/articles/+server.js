// @ts-nocheck
import { s3Client, articles } from "@aiblogs/db";
import { json } from "@sveltejs/kit";

// List the objects in the bucket
export async function GET() {
    // const articles = await articles.getPublicArticles(true)

    const body = { body: '699696969' };
    return new Response(JSON.stringify(body))
}

// Uploads an object to the bucket
export async function POST( event ) {
    const req = await event.request.json()
    articles.upload(req.ContentType, req.Key.toLowerCase(), req.Body, req.prefix)
    
    const body = {
        success: true,
    }
    return json(body)
}

// Swaps the visibility of an object from private to public or vice versa
export async function PUT( event ) {
    const req = await event.request.json()

    if (req.noMarkdown) {
        articles.noMarkdown(req.ContentType, req.Key, req.Body, req.prefix)
    } else {
        articles.swapVisibility(req.ContentType, req.Key, req.Body, req.prefix)
    }

    
    const body = {
        success: true,
    }
    return json(body)
}