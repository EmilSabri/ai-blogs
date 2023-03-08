// @ts-nocheck
import { articles } from "@aiblogs/db"

export async function load ({ params }) {
    const prefix = params.visible
    const key = `${params.article_slug}`
    
    const markdown = await articles.getArticle(prefix, `${key}/markdown.md`)
    const metadata = await articles.getArticle(prefix, `${key}/metadata.json`)
    const metaJson = JSON.parse(metadata)

    return {
        markdown: markdown,
        metadata: metaJson,
        visible: prefix
    }
}