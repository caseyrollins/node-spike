const db = require('../../db')
const aws = require('aws-sdk')

exports.createOrganizationHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const eventBody = JSON.parse(event.body)
    const organizationName = eventBody.name;

    // create the new organization
    // TODO: error handling and result parsing
    const insertOrganization = 'INSERT INTO organizations (name) VALUES ($1)'
    const result = await db.query(insertOrganization, [organizationName])
    const response = {
        statusCode: 200,
        body: result
    }

    const params = {
        FunctionName: 'createApplication',
        InvocationType: 'Event'
    }

    // TODO
    // call the ZP lambda to create the organization (partner) in ZP
    // createPartner event isn't written yet, so manually calling createApplication to show POC

    // eventPayload = {
    //     "name": "New App",
    //     "is_time_tracking": false,
    //     "redirect_uri": "http://example.com"
    // }

    // eventParams = {
    //     FunctionName: 'createApplication',
    //     Payload: JSON.stringify(eventPayload)
    // }

    // lambda.invoke(eventParams, function(error, data) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log(data.Payload)
    //         res = JSON.parse(data.Payload)
    //         console.log(JSON.Stringify(res));
    //     }
    // });

    return response
}

