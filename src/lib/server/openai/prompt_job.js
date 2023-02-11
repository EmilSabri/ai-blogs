import { articles } from '$lib/server/articles';


export const promptFunc = async (job) => {
    // const childrenValues = await job.getChildrenValues()
    // const params = Object.values(childrenValues)[0]
    const params = job.data.body

    // Send this data off to S3 bucket and article queue to be processed
    await articles.upload(
        `text/markdown`,
        `${params.metadata.contentLink}/markdown.md`,
        params.markdown
    )

    await articles.upload(
        'application/json', 
        `${params.metadata.contentLink}/metadata.json`, 
        params.metadata
    )
    const millis = Date.now() - params.startTime
    console.log(`Uploaded ${params.metadata.keyword} to S3 took: ${millis / 1000} secs`)
    return {success: true}
}