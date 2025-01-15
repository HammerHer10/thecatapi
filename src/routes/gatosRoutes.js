const express = require('express');
const { getBreeds, getBreedById, searchBreeds } = require('../controllers/gatosController');

const router = express.Router();

// Rutas de gatos
router.get('/breeds', getBreeds);
router.get('/breeds/:breed_id', getBreedById);
router.get('/breeds/search', searchBreeds);

module.exports = router;
