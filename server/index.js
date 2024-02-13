const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt');



const uri = 'mongodb+srv://bonjenn:mypassword@cluster0.mmpepbb.mongodb.net/?retryWrites=true&w=majority'


const app = express()
app.use(cors())

app.use(express.json());

app.get('/', (req,res) => {
    res.json('Hello to my app')

})

// Sign The User Up


app.post('/signup', async (req,res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserID = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserID,
            email: sanitizedEmail,
            hashed_password: hashedPassword

        }
       const insertedUser = await users.insertOne(data)

       const token = jwt.sign({ userId: generatedUserID, email: sanitizedEmail }, 'your_secret_key', {
        expiresIn: '24h',
       })

       res.status(201).json({ token, userId: generatedUserID, email: sanitizedEmail})

    } catch (err) {
       console.log(err);
    }

})


// Return Users 

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