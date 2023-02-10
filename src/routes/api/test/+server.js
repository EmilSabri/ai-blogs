import { test } from "$lib/server/openai/broker";


export async function GET() {
    const body = await test()
    return new Response(JSON.stringify(body))
}