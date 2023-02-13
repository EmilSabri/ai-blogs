import { articles } from '$lib/server/articles';


export const promptFunc = async (job) => {
    const params = job.data.body

    // Send this data off to S3 bucket private and article queue to be processed
    const prefix = 'private'
    await articles.upload(
        `text/markdown`,
        `${params.metadata.contentLink}/markdown.md`,
        params.markdown,
        prefix
    )

    await articles.upload(
        'application/json', 
        `${params.metadata.contentLink}/metadata.json`, 
        params.metadata,
        prefix
    )
    const millis = Date.now() - params.startTime
    console.log(`Uploaded ${params.metadata.keyword} to S3 took: ${millis / 1000} secs`)
    return {success: true}
}