const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dotenv = require('dotenv');
const gatosRoutes = require('./routes/gatosRoutes');



const app = express();

app.use(cors());
app.use(express.json());

// Rutas de gatos
app.use('/api/gatos', gatosRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('API de Gatos en funcionamiento');
});

module.exports = app;
