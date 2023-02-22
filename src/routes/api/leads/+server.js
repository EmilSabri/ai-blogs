import * as SibApiV3Sdk from 'sib-api-v3-sdk'
import { apiInstance } from '../../../hooks.server.js'

export async function POST( event ) {
    const req = await event.request.json()

    let createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = req.email

    apiInstance.createContact(createContact)
    .then((data) => { console.log('API called successfully. Returned data: ' + JSON.stringify(data))}, (error) => {
        console.error("6969", error);
    });


    const body = {
        yes: 'success'
    }
    return new Response(JSON.stringify(body))
}