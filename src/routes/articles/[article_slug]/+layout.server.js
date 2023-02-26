import { articles } from "$lib/server";



export async function load({ params }) {
    const key = `${params.article_slug.toLowerCase()}`

    const relatedArticles = await articles.getRelatedArticles(key.toLowerCase(), 6)

    return {
        relatedArticles: relatedArticles
    };
  }

export const config = {
    runtime: 'edge',
    isr: {
        expiration: 24 * 60 * 60,   // 24 hours as seconds
    }
}