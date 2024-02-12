const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://bonjenn:youwillneverknow64@cluster0.mmpepbb.mongodb.net/?retryWrites=true&w=majority'


const app = express()

app.use(express.json());

app.get('/', (req,res) => {
    res.json('Hello to my app')

})

app.post('/signup', (req,res) => {
    res.json('Hello to my app')

})

app.get('/users', async (req,res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)

    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).send("An error occurred while fetching users.");
    } finally {
        await client.close()
    }

})





app.listen(PORT, ()=> console.log('Server running on PORT ' + PORT))