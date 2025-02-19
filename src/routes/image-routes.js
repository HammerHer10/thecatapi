const express = require('express');
const ImageController = require('../controllers/image-controller');

const router = express.Router();

router.get('/imagesbybreedid', ImageController.getImagesByBreedId);

module.exports = router;
