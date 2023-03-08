import { articles } from "@aiblogs/db";

export async function GET() {
    // Get all private articles
    // const publicList = await articles.getPublicArticles(false, 600)


    // for (let i = 0; i < publicList.length; i++) {
    //     let markdown = await articles.getArticle('public', publicList[i] + '/markdown.md')

    //     if (markdown.length <= 50) {
    //         let metadata = await articles.getArticle('public', publicList[i] + '/metadata.json')

    //         articles.noMarkdown('text/markdown', publicList[i] + '/markdown.md', markdown, 'public')
    //         articles.noMarkdown('application/json', publicList[i] + '/metadata.json', metadata, 'public')
    //         console.log(i, publicList[i])
    //     }
    // }

    const body = {dint: 'dong'}
    return new Response(JSON.stringify(body))
}