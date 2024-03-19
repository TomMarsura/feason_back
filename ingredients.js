const express = require('express');
const { getIngredientsCollection } = require('./mongoDB');

const router = express.Router();

router.get('/ingredients', async (req, res) => {
    const collection = await getIngredientsCollection();

    try {
        const ingredients = await collection.find({}).toArray();
        res.json(ingredients); // Correction : Utilisez ingredients au lieu de recipes
        console.log('Ingredients fetched');
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ error: 'Error fetching ingredients' });
    }
});

module.exports = router;
