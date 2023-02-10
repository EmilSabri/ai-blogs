import { createClient } from "redis"
import { Client } from "redis-om"
import { REDIS_HOST, REDIS_PASSWORD, REDIS_USERNAME, REDIS_PORT} from "$env/static/private"

const connection = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
export const redisOm = new Client()
await redisOm.open(connection)

// https://github.com/redis/node-redis/blob/HEAD/docs/pub-sub.md
// Read up on redis pub sub ^^^