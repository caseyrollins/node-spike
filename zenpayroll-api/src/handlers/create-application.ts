import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  } from "aws-lambda";

  export const createApplicationHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const partnerId = JSON.stringify(event.pathParameters.partnerId);
    return {
      statusCode: 200,
      body: `Partner ID: ${partnerId}`
    }
  }

// const http = require('http')
// const AWS = require('aws-sdk')

// const env = process.env.ENV;
// const secretsManagerClient = new AWS.SecretsManager({});

// function setBaseUrl() {
//     switch (env.toLowerCase()) {
//         case 'production':
//             baseUrl = 'https://api.gusto.com/internal';
//             break;
//         case 'demo':
//             baseUrl = 'https://api.gusto-demo.com/internal';
//             break;
//         case 'development':
//             baseUrl = 'http://host.docker.internal:3000/internal';
//             break;
//     }
//     return baseUrl;
// }

// async function getSecret (secretName) {
//     return new Promise((resolve, reject) => {
//         secretsManagerClient.getSecretValue({SecretId: secretName}, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(JSON.parse(data.SecretString))
//             }
//         })
//     })
// }

// exports.createApplicationHandler = async (event) => {
//     if (event.httpMethod !== 'POST') {
//         throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
//     }

//     // All log statements are written to CloudWatch
//     console.info('received:', event);

//     const baseUrl = setBaseUrl();
//     const partnerId = event.pathParameters.partnerId;
//     const applicationsUrl = `${baseUrl}/partners/${partnerId}/applications`;

//     const apiSecret = await getSecret(`app/${env}/payroll/doorkeeper_api`);
//     const apiSecretValue = apiSecret['partner_credentials'];

//     const eventBody = JSON.parse(event.body);
//     const requestBody = JSON.stringify(eventBody);
//     const options = {
//         method: 'POST',
//         headers: {
//             'Authorization': apiSecretValue,
//             'Content-Type': 'application/json',
//             'Content-Length': requestBody.length
//         }
//     }

//     let responseBody = "";
//     const response = await new Promise((resolve, reject) => {
//         const req = http.request(applicationsUrl, options, res => {
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

//         req.write(requestBody);
//         req.end();
//     });

//     return response;
// }
