// @ts-nocheck
// @ts-nocheck
import { siteLinks } from '$lib/data';
import { error } from '@sveltejs/kit';
import { articleRepository } from "$lib/server/redis"

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

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params }) {
    // Todo - Split this into nav_links and footer_links. And put them in a separate file.
    const allowedUrls = siteLinks.combined.map( (link) => link.link );

    const url = params.nav_links;
    if ( !allowedUrls.includes(url) ) {
        throw error(404, `Not Found for ${url}`)
    }

    let articles = []
    const navLinks = siteLinks.nav.map((link) => link.link)

    if ( navLinks.includes(url) ) {
        // Pull articles with tag {url}
        const articleResults = await articleRepository.search().where('tags').containOneOf(url).return.all()
        
        if (articleResults.length > 0) {
            articles = articleResults.map((article) => toArticle(article))
        }
    }

    
    // Todo - Get all posts with the tag {data.url} 
    return {url: url, articles: articles};
}