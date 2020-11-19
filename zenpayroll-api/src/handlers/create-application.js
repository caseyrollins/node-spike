const http = require('http')

exports.createApplicationHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    const baseURL = "http://host.docker.internal:3000/internal";
    const partnerId = event.pathParameters.partnerId;
    const applicationsURL = `${baseURL}/partners/${partnerId}/applications`;

    console.log(applicationsURL);

    const eventBody = JSON.parse(event.body);
    const requestBody = JSON.stringify(eventBody);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestBody.length,
            'Authorization': 'Harry Potter and the Chamber of API Keys'
        }
    }

    let responseBody = "";
    const response = await new Promise((resolve, reject) => {
        const req = http.request(applicationsURL, options, res => {
            res.on('data', chunk => {
                responseBody += chunk;
            });
            res.on('end', () => {
               resolve({
                   statusCode: res.statusCode,
                   body: JSON.stringify(JSON.parse(responseBody))
               });
            });
        });

        req.on('error', err => {
            reject({
                statusCode: 500,
                body: "bad"
            })
        });

        req.write(responseBody);
        req.end();
    });

    return response;
}
