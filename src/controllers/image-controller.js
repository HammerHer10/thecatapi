const ImageService = require('../services/image-service');

class ImageController {
    static async getImagesByBreedId(req, res) {
        try {
            const { breed_id } = req.query;
            if (!breed_id) {
                return res.status(400).json({ error: 'El parámetro breed_id es requerido' });
            }
            
            const images = await ImageService.getImagesByBreed(breed_id);
            res.json(images);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ImageController;