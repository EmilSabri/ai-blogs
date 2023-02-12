// @ts-nocheck
import { KEYWORD_QUEUE, queue } from '$lib/server/redis'

const keywords = [
//   'brain fog',
//   'brain fog meaning',
//   'brain fog symptoms',
//   'brain fog treatment',
//   'clear brain fog instantly',
//   'brain fog causes',
//   'mental fog',
//   'brain fog anxiety',
//   'fuzzy head feeling',
//   'head feels foggy',
//   'foggy head',
//   'brain fog and fatigue',
//   'mind fog',
//   'brain fog reddit',
//   'brain fog depression',
//   'adhd brain fog',
//   'chemo brain fog',
//   'brain feels foggy',
//   'fuzzy brain',
//   'constant brain fog',
//   'my brain feels foggy',
//   'brain fog cure',
//   'feeling foggy',
//   'pandemic brain fog',
//   'brain fog after eating',
//   'cloudy head feeling',
//   'head feels heavy and foggy',
//   'my head feels foggy',
//   'cloudy head',
//   'get rid of brain fog',
//   'cloudy mind',
//   'severe brain fog',
//   'period brain fog',
//   'lupus brain fog',
//   'chemo fog',
//   'memory fog',
//   'anxiety and brain fog',
//   'lupus fog',
//   'foggy brain meaning',
//   'thyroid brain fog',
//   'gluten brain fog',
//   'brain fog for years',
//   'lexapro brain fog',
//   'fibromyalgia brain fog',
//   'my head feels fuzzy',
//   'cognitive fog',
//   'diabetes brain fog',
//   'cloudy brain',
//   'migraine brain fog',
//   'nofap brain fog',
//   'foggy head days after drinking',
//   'reddit brain fog',
//   'extreme brain fog',
//   'feeling foggy and tired',
//   'depression and brain fog',
//   'wellbutrin brain fog',
//   'pms brain fog',
//   'sinus infection brain fog',
//   'foggy thinking',
//   'chronic brain fog',
//   'hypothyroidism brain fog',
//   'depression fog',
//   'vitamin d brain fog',
//   'brain fog after drinking',
//   'prednisone brain fog',
//   'brain feels fuzzy',
//   'mental fog meaning',
//   'brain fog in the morning',
//   'sleep apnea brain fog',
//   'mind feels foggy',
//   'foggy headache',
//   'clear brain fog',
//   'allergy brain fog',
//   'gabapentin brain fog',
//   'ptsd brain fog',
//   'iron deficiency brain fog',
//   'sugar brain fog',
//   'sudden brain fog',
//   'fuzziness in head',
//   'caffeine brain fog',
//   'my mind feels foggy',
//   'headache and brain fog',
//   'ibs brain fog',
  'pfizer brain fog',
  'brain fuzz',
  'signs of brain fog',
  'pcos brain fog',
  'bipolar brain fog',
  'adhd and brain fog',
  'cog fog',
  'dehydration brain fog',
  'brain fog headache',
  'candida brain fog',
  'brain fog after pfizer',
  'brain fog nofap',
  'lyme disease brain fog',
  'mind fog meaning',
  'vitamin d deficiency brain fog',
  'tmj brain fog',
  'brain fog medical term',
]

export async function GET() {

    const callOAI = (results) => {
        const key = Object.keys(results)[0]
        const keywords = []
        for (let i = 0; i < results[key].length; i++) {
            // Call OAI API's with prompt and keyword
            let keyWord = results[key][i]
            keywords.push(keyWord)
        }

        console.log(keywords)
    }
    
    // const body = {
    //     keywords: await getKeywords(callOAI)
    // }

    // Remove 20 keyword limit once keyword queue has been set up

    let i = 0
    const body = keywords.slice(0, 1)
    body.forEach((keyword) => {
        queue.add('keywords', { keyword: keyword})
    })

    return new Response(JSON.stringify({body: 'success'}))
}
