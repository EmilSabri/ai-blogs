
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const url = params.page_slug;

    // Todo - Get all posts with the tag {data.url} 
    
    return {url: url};
}