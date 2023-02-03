/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-nocheck

import * as fs from "fs"
import csv from "csv-parser"

const csvHeaders = {
        'Keyword': 0,
        'Currency' : 1,
        'Avg. monthly searches': 2,
        'Three month change': 3,
        'YoY change': 4,
        'Competition': 5,
        'Competition (indexed value)': 6,
        'Top of page bid (low range)' : 7,
        'Top of page bid (high range)' : 8,
        'Ad impression share' : 9,
        'Organic impression share' : 10,
        'Organic average position' : 11,
        'In account?' : 12,
        'In plan?' : 13,
        'Searches: Jan 2022' : 14,
        'Searches: Feb 2022' : 15,
        'Searches: Mar 2022' : 16,
        'Searches: Apr 2022' : 17,
        'Searches: May 2022' : 18,
        'Searches: Jun 2022'    : 19,
        'Searches: Jul 2022' : 20,
        'Searches: Aug 2022' : 21,
        'Searches: Sep 2022' : 22 ,
        'Searches: Oct 2022' : 23,
        'Searches: Nov 2022' : 24,
        'Searches: Dec 2022' : 25,
        'Concept: Site' : 26,
        'Concept: Disease' : 27,
        'Concept: Healthcare Company': 28,
        'Concept: Other Brands' : 29,
        'Concept: Information' : 30, 
        'Concept: Non-Brands' : 31,
        'Concept: New-Used-Old' : 32,
        'Concept: Others': 33,
}
      


export function getKeywords(someFunc) {
    const results = [];

    fs.createReadStream('./src/lib/server/keywords/semaglutide.csv', { encoding: 'ucs-2' })
        .pipe(csv())
        .on('data', (data) => {
            // console.log(Object.keys(data)[0])
            // console.log(Object.values(data)[0])
            // console.log('-----------------')
            // const key = decodeURIComponent(Object.keys(data)[0])
            // const value = decodeURIComponent(Object.values(data)[0])
            results.push(data)
        })
        .on('end', () => {
            console.log(results[0])


            // Split keys of the object by the tab character
            const key = Object.keys(results[0])[0]
            const keys = key.split('\t');

            // Create an object with the keys and values

            const obj = keys.reduce((o, key) => ({ ...o, [key]: [] }), {})

            for (let i = 0; i < results.length; i++) {
                let row = results[i];
                let values = Object.values(row)[0].split('\t')

                if (values.includes('Medium') || values.includes('High')) {
                    continue;
                    // Todo - Write out the Medium and High competition rows to a file
                    //  So that we can use them later
                };

                for (let j = 0; j < keys.length; j++) {
                    obj[keys[j]].push(values[j])
                }
            }

            someFunc(obj)
        });
}