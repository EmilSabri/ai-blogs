

import { articles } from '@aiblogs/db'

export async function load( { url } ) {

    if (url.hostname !== 'localhost' || !url.hostname.includes('127.0.0.1')) {
        throw new Error('Fuck outta here BOIIIII')
    }

    const privateArticles = await articles.getPrivateArticles(false, 150)
    // for (const article of privateArticles) {

    //     // articles.deleteObject('private' + article.Key)
    //     let metadata = JSON.parse(await articles.getArticle('private', article + "/metadata.json"))
        
    //     metadata.contentLink = metadata.contentLink.toLowerCase()
    //     console.log(metadata.contentLink)

    //     await articles.upload('application/json', `${metadata.contentLink}/metadata.json`, metadata, 'private')

        
    // }

    const publicArticles = await articles.getPublicArticles(false, 150)   

    return {
        privateArticles: privateArticles,
        publicArticles: publicArticles
    }
}