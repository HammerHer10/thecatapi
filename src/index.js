const app = require('./app');

const config = require('./config/config');

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
    console.log("API Key:", process.env.CAT_API_KEY);
});
