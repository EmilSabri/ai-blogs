// @ts-nocheck
import { getKeywords } from '$lib/server'

export async function GET() {
    const callOAI = (results) => {
        console.log('test()')
        console.log(results['Competition'].length)


        const key = Object.keys(results)[0]
        for (let i = 0; i < results[key].length; i++) {
            // Call OAI API's with prompt and keyword
            let keyWord = results[key][i]
            console.log(keyWord)

            // Use
        }
    }

    getKeywords(callOAI)
}