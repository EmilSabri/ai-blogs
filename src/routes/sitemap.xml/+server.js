// @ts-nocheck
// Create function get() that returns a sitemap.xml file

import { DOMAIN } from "$env/static/private"
import { articles } from "$lib/server/"

function tempXML(url) {
    return `<url>
    <loc>https://www.${DOMAIN}/articles/${url}</loc>
    <lastmod>2023-24-23T23:58:19-07:00</lastmod>
    </url>`
   }
  

export async function GET() {
    const headers = {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    }

    const data = await articles.getPublicArticles(false, 300)

    let urls = data?.map((url) => tempXML(url)) || []
    

    const resp = new Response(`<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    > 
    <url>
      <loc>https://www.${DOMAIN}/</loc>
      <lastmod>2023-24-23T23:58:19-07:00</lastmod>
      <changefreq>daily</changefreq>
    </url>

    ${urls.join('\n')}
    </urlset>`, {headers})

    return resp
   
}