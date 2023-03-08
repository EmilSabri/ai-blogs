// @ts-nocheck
// Create function get() that returns a sitemap.xml file

import { articles } from "@aiblogs/db"

// TODO - Save sitemap.xml to a file and update it every 48 hours
// 1. Check last time the file was updated using redis as the store for the last mod data
// 2. If it's been more than 48 hours, update the file
// 3. Else return it as is from the S3 bucket

// Todo - Add ancillary pages to sitemap such as search, about, tag pages, etc.
function tempXML(host, datum) {
    const url = datum.contentLink
    const date = new Date(datum.date).toISOString()
    return `<url>
    <loc>https://www.${host}/articles/${url}</loc>
    <lastmod>${date}</lastmod>
    </url>`
  }

function getLatestDate(firstDate, secondDate) {
  if (firstDate > secondDate) {
    return firstDate
  }

  return secondDate
}
  

export async function GET({url}) {

  console.log("69", url)
    const headers = {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    }

    // TODO - remove the www. part of url.host. Do this for everywhere that uses url.host
    let {host} = url
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
        host = 'brianfog.com'
    }
    
    const metadata = await articles.getPublicArticles(host, true, 999)

    let latestDate = new Date(0)
    let urls = metadata?.map((datum) => {
      latestDate = getLatestDate(latestDate, new Date(datum.date))
      return tempXML(host, datum)
    }) || []
    

    const resp = new Response(`<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url>
      <loc>https://www.${host}/</loc>
      <lastmod>${latestDate.toISOString()}</lastmod>
      <changefreq>daily</changefreq>
    </url>

    ${urls.join('\n')}
    </urlset>`, {headers})

    return resp
   
}