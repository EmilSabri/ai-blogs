// @ts-nocheck
import { Entity, Schema} from 'redis-om'
import { redisOm } from "../../hooks.server"

// https://github.com/redis/redis-om-node
// Read up on redis-om ^^^

export class Article extends Entity {}
export class Markdown extends Entity {}


const markdownSchema = new Schema(Markdown, {
    contentLink: { type: 'string' },
    markdown: { type: 'string' },
})

const articleSchema = new Schema(Article, {
    title: { type: 'text' },
    description: { type: 'text' },
    date: { type: 'date' },
    author: { type: 'string' },
    imageUrl: { type: 'string', indexed: false}, 
    imageAlt: { type: 'string', indexed: false },
    tags: { type: 'string[]' },
    contentLink: { type: 'string'},
    keyword: { type: 'string', indexed: false},
})

export const articleRepository = redisOm.fetchRepository(articleSchema)
await articleRepository.createIndex();

export const markdownRepository = redisOm.fetchRepository(markdownSchema)
await markdownRepository.createIndex();


// const article1 = articleRepository.createEntity(
//     {
//         title: 'Article 1',
//         description: 'Article 1 description',
//         date: new Date(),
//         author: 'Author Rohtua',
//         imageUrl: 'https://picsum.photos/200/300',
//         imageAlt: 'Article 1 image',
//         tags: ['tag1', 'tag2', 'tag3'],
//         contentLink: 'https://www.google.com'
//     }
// )


// Using redis OM
// 1. Save to redis
// await articleRepository.save(article1) 
// articleRepository.createAndSave({fields})

// 2. Update to redis
// await articleRepository.save(article1)

// 3. Remove from redis
// await articleRepository.remove(article1 ID)


// Flow for redis OM
// !! Maybe it'd just be better to call redis and if it doesn't have it then call s3 then update redis with the s3 data !!