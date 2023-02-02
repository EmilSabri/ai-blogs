import { s3Client } from "$lib/server";

export async function GET() {
    const articles = s3Client.listObjects()
    return { body: articles };
}


export async function POST() {
    // We have the chatgpt prompt
    // Turn it into article

}