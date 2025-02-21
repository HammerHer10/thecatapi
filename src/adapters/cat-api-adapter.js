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
                    'x-api-key': config.apiKey || '', 
                },
            };

            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        if (res.statusCode !== 200) {
                            return reject(new Error(`Error API: ${res.statusCode} ${res.statusMessage}`));
                        }
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(new Error(`Error al parsear JSON: ${error.message}`));
                    }
                });
            });

            req.on('error', (error) => reject(new Error(`Error en la solicitud HTTP: ${error.message}`)));
            req.end();
        });
    }
}

module.exports = CatApiAdapter;
