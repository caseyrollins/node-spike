// const { query } = require('../../db');
const db = require('../../db')

exports.createOrganizationHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const eventBody = JSON.parse(event.body)
    const organizationName = eventBody.name;


    const insertOrganization = 'INSERT INTO organizations (name) VALUES ($1)'
    const result = await db.query(insertOrganization, [organizationName])
    const response = {
        statusCode: 200,
        body: result
    }

    return response

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    // var params = {
    //     TableName : tableName,
    //     Item: { id : id, name: name }
    // };

    // const result = await docClient.put(params).promise();

    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify(body)
    // };

    // All log statements are written to CloudWatch
    // console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    // return response;
}


// const http = require('http')

// exports.createApplicationHandler = async (event) => {
//     if (event.httpMethod !== 'POST') {
//         throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
//     }

//     // All log statements are written to CloudWatch
//     console.info('received:', event);

//     const baseURL = "http://host.docker.internal:3000/internal";
//     const partnerId = event.pathParameters.partnerId;
//     const applicationsURL = `${baseURL}/partners/${partnerId}/applications`;

//     console.log(applicationsURL);

//     const eventBody = JSON.parse(event.body);
//     const requestBody = JSON.stringify(eventBody);
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': requestBody.length,
//             'Authorization': 'Harry Potter and the Chamber of API Keys'
//         }
//     }

//     let responseBody = "";
//     const response = await new Promise((resolve, reject) => {
//         const req = http.request(applicationsURL, options, res => {
//             res.on('data', chunk => {
//                 responseBody += chunk;
//             });
//             res.on('end', () => {
//                resolve({
//                    statusCode: res.statusCode,
//                    body: JSON.stringify(JSON.parse(responseBody))
//                });
//             });
//         });

//         req.on('error', err => {
//             reject({
//                 statusCode: 500,
//                 body: "bad"
//             })
//         });

//         req.write(responseBody);
//         req.end();
//     });

//     return response;
// }
