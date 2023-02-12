

// 
export async function load({ url }) {
    const params = url.searchParams.get('q')
    
    return {
        search_params: params
    }
}