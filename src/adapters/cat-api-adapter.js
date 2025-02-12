const https = require('https');
const config = require('../config/config');

class CatApiAdapter {
    static async fetchData(endpoint) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.thecatapi.com',
                path: `/v1${endpoint}`,
                method: 'GET',
                headers: {
                    'x-api-key': config.apiKey,
                },
            };

            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            req.on('error', (error) => reject(error));
            req.end();
        });
    }
}

module.exports = CatApiAdapter;
