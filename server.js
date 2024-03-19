const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ingredientsRoute = require('./ingredients');

const app = express();
const port = 3200;

const client = new MongoClient(process.env.MONGO_URL);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Remplacez par l'URL de votre application frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


async function getIngredientsCollection(){
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('feason').collection('ingredients');
}

async function getRecipesCollection() {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('feason').collection('recipes');
}


/* ROUTES */

app.get('/ingredients', async (req, res) => {
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

app.get('/recipes', async (req, res) => {
    const collection = await getRecipesCollection(); // Assurez-vous d'avoir une fonction similaire à getIngredientsCollection pour obtenir la collection de recettes

    try {
        const recipes = await collection.find({}).toArray();
        res.json(recipes);
        console.log('Recipes fetched');
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Error fetching recipes' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
