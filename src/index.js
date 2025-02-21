const app = require('./app');

const { connectDB, config } = require('./config/config');

connectDB();

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
    console.log("API Key:", process.env.CAT_API_KEY);
});
