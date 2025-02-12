const express = require('express');
const CatController = require('../controllers/cat-controller');

const router = express.Router();

router.get('/breeds', CatController.getBreeds);
router.get('/breeds/search', CatController.searchBreeds);
router.get('/breeds/:id', CatController.getBreedById);

module.exports = router;
