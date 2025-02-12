const CatApiAdapter = require('../adapters/cat-api-adapter');

class CatService {
    static async getBreeds() {
        return CatApiAdapter.fetchData('/breeds');
    }

    static async searchBreeds(query) {
        const breeds = await CatApiAdapter.fetchData('/breeds');
        return breeds.filter((breed) =>
            breed.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    static async getBreedById(id) {
        const breeds = await this.getBreeds();
        return breeds.find(breed => breed.id === id) || null;
    }
}

module.exports = CatService;
