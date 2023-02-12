export async function GET() {
    const body = {dint: 'dong'}
    return new Response(JSON.stringify(body))
}