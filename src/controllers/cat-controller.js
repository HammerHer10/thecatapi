const CatService = require('../services/cat-service');

class CatController {
    static async getBreeds(req, res) {
        try {
            const breeds = await CatService.getBreeds();
            res.json(breeds);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las razas' });
        }
    }

    static async searchBreeds(req, res) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: 'El parámetro query es obligatorio' });
            }

            const filteredBreeds = await CatService.searchBreeds(query);
            if (filteredBreeds.length === 0) {
                return res.status(404).json({ error: 'No se encontraron coincidencias' });
            }

            res.json(filteredBreeds);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar razas' });
        }
    }

    static async getBreedById(req, res){
        try {
            const { id } = req.params;
            const breed = await CatService.getBreedById(id);
    
            if (!breed) {
                return res.status(404).json({ error: 'Raza no encontrada' });
            }
    
            res.json(breed);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la raza' });
        }
    }
}

module.exports = CatController;
