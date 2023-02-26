import { articles } from "$lib/server";



export async function load({ params }) {
    const key = `${params.article_slug.toLowerCase()}`

    const relatedArticles = await articles.getRelatedArticles(key.toLowerCase(), 6)

    return {
        relatedArticles: relatedArticles
    };
  }