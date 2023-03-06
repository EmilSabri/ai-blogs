import { articles } from "$lib/server";



export async function load( {params, url} ) {
    console.log('host', url)
    const key = `${params.article_slug.toLowerCase()}`

    const host = 'brianfog.com' // url.host
    const relatedArticles = await articles.getRelatedArticles(host, key.toLowerCase(), 6)
    
    return {
        relatedArticles: relatedArticles
    };
  }