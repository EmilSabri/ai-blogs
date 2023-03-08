// @ts-nocheck
import { SENDINBLUE_KEY } from "$env/static/private"

import { Client } from "redis-om"
import * as SibApiV3Sdk from 'sib-api-v3-sdk'

let defaultClient = SibApiV3Sdk.default.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SENDINBLUE_KEY;
export let apiInstance = new SibApiV3Sdk.default.ContactsApi();


const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_PASSWORD = process.env.REDIS_PASSWORD


const connection = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
export const redisOm = new Client()
await redisOm.open(connection)