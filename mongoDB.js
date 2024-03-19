async function getRecipesCollection() {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('feason').collection('recipes');
}