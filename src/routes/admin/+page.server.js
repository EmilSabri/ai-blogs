

import { articles } from '$lib/server/articles'

export async function load( { url } ) {

    if (url.hostname !== 'localhost') {
        throw new Error('Fuck outta here BOIIIII')
    }

    const privateArticles = await articles.getPrivateArticles(false, 60)
    const publicArticles = await articles.getPublicArticles(false, 60)

    return {
        privateArticles: privateArticles,
        publicArticles: publicArticles
    }
}