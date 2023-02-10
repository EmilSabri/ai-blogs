// @ts-nocheck
import { Entity, Schema} from 'redis-om'
import { redisOm } from "../../hooks.server"
import { Queue, Worker, FlowProducer } from 'bullmq'
import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } from '$env/static/private'


export const KEYWORD_QUEUE = 'KEYWORD_QUEUE'

const connection = {
    host: REDIS_HOST, 
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

export const queue = new Queue(KEYWORD_QUEUE, { connection: connection })
export const flow = new FlowProducer({ connection })


// Possibly have worker for this queue  create a flow tree for each keyword

const retryOpts = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 500
    }
}

const promptFlow = async (job) => {
    const keyword = job.data.keyword
    const originalTree = await flow.add({
        name: 'prompt',
        queueName: 'prompt',
        data: {},
        children: [
            {
                name: 'outline-paragraphs',
                data: {},
                queueName: 'outline-paragraphs',
                opts: retryOpts,
                children: [
                    {
                        name: 'outline',
                        data: {keyword: keyword},
                        queueName: 'outline',
                        opts: retryOpts,
                    }
                ],
            }
        ]
    })

    console.log(`Start promptFlow - ${keyword}`)
}

// Workers
new Worker(KEYWORD_QUEUE, promptFlow, {connection: connection})
new Worker(KEYWORD_QUEUE, promptFlow, {connection: connection})


// const testPubArticle = 'brain fog reddit'
// await redisPub.publish(KEYWORD_QUEUE, testPubArticle);


// ----------------------------------------------

// https://github.com/redis/redis-om-node
// Read up on redis-om ^^^

export class Article extends Entity {}
export class NewArticleQueue extends Entity {}  // Queue for new articles

const articleSchema = new Schema(Article, {
    title: { type: 'string' },
    description: { type: 'string' },
    date: { type: 'date' },
    author: { type: 'string' },
    imageUrl: { type: 'string', indexed: false}, 
    imageAlt: { type: 'string', indexed: false },
    tags: { type: 'string[]' },
    contentLink: { type: 'string', indexed: false },
    keyword: { type: 'string', indexed: false},
})

// export const articleRepository = redisOm.fetchRepository(articleSchema)
// await articleRepository.createIndex();


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
