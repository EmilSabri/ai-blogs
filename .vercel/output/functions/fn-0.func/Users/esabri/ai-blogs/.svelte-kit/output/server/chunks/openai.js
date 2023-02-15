import { S as S3_ACCESS_KEY, a as S3_SECERET_KEY, b as S3_REGION, c as S3_BUCKET_ARTICLES, O as OPENAI_KEY, i as ioRedis } from "./hooks.server.js";
import { S3Client, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Configuration, OpenAIApi } from "openai";
const accessKeyID = S3_ACCESS_KEY;
const secretAccessKey = S3_SECERET_KEY;
const region = S3_REGION;
const client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKeyID,
    secretAccessKey
  }
});
function getObject(Bucket, Key) {
  return new Promise(async (resolve, reject) => {
    const getObjectCommand = new GetObjectCommand({ Bucket, Key });
    try {
      console.log("s3.getObject() - ", Key);
      const response = await client.send(getObjectCommand);
      let responseDataChunks = [];
      response.Body.once("error", (err) => reject(err));
      response.Body.on("data", (chunk) => responseDataChunks.push(chunk));
      response.Body.once("end", () => resolve(responseDataChunks.join("")));
    } catch (err) {
      return reject(err);
    }
  });
}
function listObjects(getMetaData = false, maxKeys = 50, prefix = "") {
  return new Promise(async (resolve, reject) => {
    const bucketParams = { Bucket: S3_BUCKET_ARTICLES, MaxKeys: maxKeys + 1, Delimiter: "/", Prefix: prefix };
    const listObjectsCommand = new ListObjectsV2Command(bucketParams);
    try {
      const data = await client.send(listObjectsCommand);
      if (!data.CommonPrefixes)
        resolve([]);
      let articles = data?.CommonPrefixes.map((thing) => thing.Prefix.slice(0, -1).replace(prefix, "")) || [];
      let answer = [];
      if (getMetaData) {
        let filePromises = [];
        for (let i = 0; i < articles.length; i++) {
          const key = `${prefix}${articles[i]}/metadata.json`;
          const file = getObject(S3_BUCKET_ARTICLES, key);
          filePromises.push(file);
        }
        for (const fileProm of filePromises) {
          const file = await fileProm;
          answer.push(JSON.parse(file));
        }
        resolve(answer);
      } else {
        resolve(articles);
      }
    } catch (err) {
      return reject(err);
    }
  });
}
function uploadObject(Bucket, Key, Body, ContentType, ContentLength) {
  return new Promise(async (resolve, reject) => {
    try {
      const params = {
        Bucket,
        Key,
        Body,
        ContentType,
        ContentLength
      };
      const putObjectCommand = new PutObjectCommand(params);
      resolve(client.send(putObjectCommand));
    } catch (err) {
      console.log("s3client.uploadObject()", err);
      return reject(err);
    }
  });
}
function deleteObject(Bucket, Key) {
  return new Promise(async (resolve, reject) => {
    const deleteObjectCommand = new DeleteObjectCommand({ Bucket, Key });
    try {
      client.send(deleteObjectCommand);
      resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
}
const s3Client = {
  getObject,
  listObjects,
  uploadObject,
  deleteObject
};
const configuration = new Configuration({
  apiKey: OPENAI_KEY
});
const openAiApi = new OpenAIApi(configuration);
const model = "text-davinci-003";
const max_tokens = 1500;
const temperature = 0.7;
const top_p = 1;
const frequency_penalty = 0.2;
const presence_penalty = 0;
async function call(prompt) {
  const body = {
    model,
    prompt,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty
  };
  try {
    const resp = await openAiApi.createCompletion(body);
    await updateUsage(resp.data.usage);
    return resp;
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return error.response.data;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        error: {
          message: "An error occurred during your request."
        }
      };
    }
  }
}
async function updateUsage(usage) {
  await ioRedis.incrby("openai_total_tokens", usage.total_tokens);
  await ioRedis.incrby("openai_request_count", 1);
}
const openai = {
  call
};
export {
  openai as o,
  s3Client as s
};
