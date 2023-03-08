import { articleRepository } from "$lib/server/redis"

// TODO - Remove this from here and /[article_slug]/+page.server.js and put as a helper function in the schema
//  Do same for markdown schema.
const toArticle = (article) => {
    return {
        title: article.title,
        description: article.description,
        date: article.date,
        image: {
            url: article.imageUrl,
            alt: article.imageAlt,
        },
        tags: article.tags,
        contentLink: article.contentLink,
        keyword: article.keyword,
    }
}

// TODO - Fix bug that duplicates articles to redis when hovering over them or clicking them.
// The fix will either be here or in /articles/[article_slug] since that updates redis

export async function load({ url }) {
    const query = url.searchParams.get('q')

    // Retrieve articles from redis based on search query
    console.log(query)
    let didFind = true
    // Find based on query
    let articles = await articleRepository.search()
        .where('title').match(query)
        .or('description').match(query)
        .return.all()

    if (articles.length === 0) {
        didFind = false
        console.log('No results found, returning all articles')
        articles = await articleRepository.search().return.all()
    }
    
    const results = articles.map((article) => toArticle(article))

    return {
        search_params: query,
        didFind: didFind,
        articles: results,
    }
}