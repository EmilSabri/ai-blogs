import { articles } from "@aiblogs/db";



export async function load( {params, url} ) {
    console.log('host', url)
    const key = `${params.article_slug.toLowerCase()}`

    let { host } = url
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
        host = 'www.brianfog.com'
    }
    host = host.split('.').slice(1).join('.')   // Remove the www. part of the host
    
    
    const relatedArticles = await articles.getRelatedArticles(host, key.toLowerCase(), 6)

    return {
        relatedArticles: relatedArticles
    };
  }