const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3200;

const client = new MongoClient(process.env.MONGO_URL);

async function connectToMongoDB() {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('feason').collection('recipes');
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Remplacez par l'URL de votre application frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/recipes', async (req, res) => {
    const collection = await connectToMongoDB();
    try {
        const recipes = await collection.find({}).toArray();
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Error fetching recipes' });
    }
});

// Ajoutez d'autres routes selon vos besoins

async function main() {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('feason');
    const collection = db.collection('recipes');
    
}

app.get('/start', async (req, res) => {
    try {
        await main(); // Appel de la fonction main
        res.send('Main function called successfully');
    } catch (error) {
        console.error('Error calling main function:', error);
        res.status(500).send('Error calling main function');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
