const axios = require('axios');

// Configuración de la API
const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY;

// Buscar razas basadas en una consulta
const searchBreeds = async (req, res) => {
    try {
        const query = req.query.query; // parámetro de búsqueda

        // Verificar el parámetro de búsqueda
        if (!query) {
            return res.status(400).json({ message: "El parámetro de búsqueda es requerido" });
        }

        // Llamada a la API para obtener todas las razas
        const response = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY },
        });

        const breeds = response.data; 

        // Mostrar todas las razas obtenidas
        console.log("Razas obtenidas de la API:", breeds);

        // Filtrar las razas por nombre utilizando el parámetro de búsqueda (sin diferenciar mayúsculas/minúsculas)
        const filteredBreeds = breeds.filter((breed) =>
            breed.name.toLowerCase().includes(query.toLowerCase()) // Filtramos razas por nombre
        );

        
        if (filteredBreeds.length === 0) {
            return res.status(404).json({ message: "No se encontraron razas que coincidan con la búsqueda" });
        }

        // Si encontramos razas, devolvemos las razas filtradas
        return res.status(200).json(filteredBreeds);
    } catch (error) {
        console.error('Error al buscar razas:', error.message);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las razas de gatos
const getBreeds = async (req, res) => {
    try {
        const response = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las razas de gatos.' });
    }
};

// Obtener una raza específica por ID
const getBreedById = async (req, res) => {
    const { breed_id } = req.params;
    try {
        const response = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });

        const breed = response.data.find((b) => b.id === breed_id);

        if (breed) {
            res.json(breed);
        } else {
            res.status(404).json({ message: 'Raza no encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la raza de gato.' });
    }
};



module.exports = { getBreeds, getBreedById, searchBreeds  };
