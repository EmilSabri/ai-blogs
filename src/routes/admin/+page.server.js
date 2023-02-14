

import { articles } from '$lib/server/articles'

export async function load( { url } ) {

    if (url.hostname !== 'localhost') {
        throw new Error('Fuck outta here BOIIIII')
    }

    const privateArticles = await articles.getPrivateArticles(false, 150)
    const publicArticles = await articles.getPublicArticles(false, 150)

    return {
        privateArticles: privateArticles,
        publicArticles: publicArticles
    }
}