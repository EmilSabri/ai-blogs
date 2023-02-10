// @ts-nocheck
import { siteLinks } from '$lib/data';
import { error } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    // Todo - Split this into nav_links and footer_links. And put them in a separate file.
    const allowedUrls = siteLinks.combined.map( (link) => link.link );

    const url = params.nav_links;
    if ( !allowedUrls.includes(url) ) {
        throw error(404, `Not Found for ${url}`)
    }
    
    // Todo - Get all posts with the tag {data.url} 
    return {url: url};
}