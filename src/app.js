
const express = require('express');
const cors = require('cors');
const catRoutes = require('./routes/cat-routes');
const imageRoutes = require('./routes/image-routes');
const userRoutes = require('./routes/user-routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/gatos', catRoutes);
app.use('/api',imageRoutes);
app.use('/users', userRoutes);

// Ruta base
app.get('/', (req, res) => res.send('API en funcionamiento'));

// Verificar que la API Key está cargada
console.log("API Key:", process.env.CAT_API_KEY);

module.exports = app;
