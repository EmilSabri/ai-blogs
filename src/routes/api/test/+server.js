import { articles } from '$lib/server/articles';

export async function GET() {

    // Get all public articles and their images
    const publicList = await articles.getPublicArticles(true, 'public', 1000)
    const images = []



    // Get all private articles
    const privateList = await articles.getPrivateArticles(false, 'private', 1000)

    // Randomly select an image and use it for the article
    // Set the image alt to the title of the article
    for (let i = 0; i < privateList.length; i++) {
        let article = articles.getArticle('private', privateList[i])


    }


    const body = {dint: 'dong'}
    return new Response(JSON.stringify(body))
}