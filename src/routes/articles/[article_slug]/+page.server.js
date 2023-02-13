// @ts-nocheck
import { articles   } from "$lib/server/articles";
import { Markdown, articleRepository, markdownRepository } from "$lib/server/redis"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const key = `${params.article_slug}`
    console.log('key -', key)

    // Check redis
    let start = Date.now()
    let articleResults = await articleRepository.search().where('contentLink').equals(key).return.all()
    let markdownResults = await markdownRepository.search().where('contentLink').equals(key).return.all()
    console.log(`Redis took: ${(Date.now() - start) / 1000} secs`)
    console.log('Redis results -', articleResults.length, markdownResults.length)

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

    const toMarkdown = (markdown) => {
        return markdown.markdown
    }

    let markdown =  ''
    let metaJson =  {}

    if (articleResults.length > 0 && markdownResults.length > 0) {
        markdown = toMarkdown(markdownResults[0])
        metaJson = toArticle(articleResults[0])
    }

    // Pull from S3 if not in redis
    if (articleResults.length === 0 || markdownResults.length === 0) {
        start = Date.now()
        const prefix = 'public/'
        markdown = await articles.getArticle(prefix, `${key}/markdown.md`)
        const metadata = await articles.getArticle(prefix, `${key}/metadata.json`)
        console.log(`S3 took: ${(Date.now() - start) / 1000} secs`)
        metaJson = JSON.parse(metadata)

        // Save to redis
        articleRepository.createAndSave({
            title: metaJson.title,
            description: metaJson.description,
            date: metaJson.date,
            author: metaJson.author,
            imageUrl: metaJson.image.url,
            imageAlt: metaJson.image.alt,
            tags: metaJson.tags,
            contentLink: metaJson.contentLink,
            keyword: metaJson.keyword,
        })

        markdownRepository.createAndSave({
            contentLink: metaJson.contentLink,
            markdown: markdown,
        })
    }
    

  return {
        markdown: markdown,
        metadata: metaJson
    };
}