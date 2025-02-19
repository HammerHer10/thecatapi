const CatApiAdapter = require('../adapters/cat-api-adapter');

class ImageService{
    static async getImagesByBreed(breedId) {
        try {
            const response = await CatApiAdapter.fetchData(`/images/search?breed_ids=${breedId}&limit=5`);
            return response.map(img => ({ id: img.id, url: img.url }));
        } catch (error) {
            throw new Error('Error obteniendo imágenes de la API de gatos');
        }
    }
}

module.exports = ImageService;