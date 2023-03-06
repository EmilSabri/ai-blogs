/* eslint-disable prefer-const */
import { S3_ACCESS_KEY, S3_SECERET_KEY, S3_REGION, S3_BUCKET_ARTICLES } from "$env/static/private";
import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";

// s3 list objects in bucket with credentials
const accessKeyID = S3_ACCESS_KEY
const secretAccessKey = S3_SECERET_KEY
const region = S3_REGION

const client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyID,
        secretAccessKey: secretAccessKey
    }
})


// Create bucket in S3
// function createBucket(Bucket: string) {
//     // eslint-disable-next-line no-async-promise-executor
//     return new Promise(async (resolve, reject) => {
//         const createBucketCommand = new CreateBucketCommand({ Bucket })

//         const resp = await client.send(createBucketCommand)
//     })
// }


function getObject(Bucket: string, Key: string) {
    // eslint-disable-next-line no-async-promise-executor
    console.log('s3.getObject() - ', Bucket, Key)
    return new Promise(async (resolve, reject) => {
        const getObjectCommand = new GetObjectCommand({ Bucket, Key })

        try {
            // console.log('s3.getObject() - ', Key)
            const response = await client.send(getObjectCommand)

            // Store all of data chunks returned from the response data stream 
            // into an array then use Array#join() to use the returned contents as a String
            let responseDataChunks: any[] = []

            // Handle an error while streaming the response body
            response.Body.once('error', (err: any) => reject(err))

            // Attach a 'data' listener to add the chunks of data to our array
            // Each chunk is a Buffer instance
            response.Body.on('data', (chunk: any) => responseDataChunks.push(chunk))

            // Once the stream has no more data, join the chunks into a string and return the string
            response.Body.once('end', () => resolve(responseDataChunks.join('')))
        } catch (err) {
            // Handle the error or throw
            return reject(err)
        }
    })
}

// List objects in s3 bucket
function listObjects(getMetaData = false, maxKeys = 50, prefix = "", startAfter = undefined) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        const bucketParams = { Bucket: S3_BUCKET_ARTICLES, MaxKeys: maxKeys, Delimiter: "/", Prefix: prefix, StartAfter: startAfter }
        const listObjectsCommand = new ListObjectsV2Command(bucketParams)
        try {
            const data = await client.send(listObjectsCommand)


            if (!data.CommonPrefixes) resolve([])

            let articles = data?.CommonPrefixes.map((thing) => thing.Prefix.slice(0, -1).replace(prefix, "")) || []

            let answer = []
            if (getMetaData) {
                let filePromises = []
                for (let i = 0; i < articles.length; i++) {
                    const key = `${prefix}${articles[i]}/metadata.json`
                    const file = getObject(S3_BUCKET_ARTICLES, key)
                    filePromises.push(file)
                }

                // Brought wait time down from 5-8 seconds to 1 second
                for (const fileProm of filePromises) {
                    const file = await fileProm
                    answer.push(JSON.parse(file))
                }
                resolve(answer)
            } else {
                resolve(articles)
            }



        } catch (err) {
            // Handle the error or throw
            return reject(err)
        }
    })
}

function uploadObject(Bucket: string, Key: string, Body: any, ContentType: string, ContentLength: number) {

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {

        try {
            const params = {
                Bucket: Bucket,
                Key: Key,
                Body: Body,
                ContentType: ContentType,
                ContentLength: ContentLength
            }
            const putObjectCommand = new PutObjectCommand(params)
            resolve(client.send(putObjectCommand))
        } catch (err) {
            console.log("s3client.uploadObject()", err)
            return reject(err)
        }
    })
}

// Delete object from s3 bucket
export function deleteObject(Bucket: string, Key: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        const deleteObjectCommand = new DeleteObjectCommand({ Bucket, Key })

        try {
            client.send(deleteObjectCommand)
            resolve(true)
        } catch (err) {
            // Handle the error or throw
            return reject(err)
        }
    })
}

export const s3Client = {
    getObject,
    listObjects,
    uploadObject,
    deleteObject
}