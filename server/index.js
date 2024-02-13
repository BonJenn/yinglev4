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

// Log the User In

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const user = await users.findOne({ email });

        // Fixed typo in 'bcrypt' and added missing parenthesis
        const correctPassword = await bcrypt.compare(password, user.hashed_password);

        if (user && correctPassword) {
            // Corrected jwt.sign parameters to include a payload object and the secret key
            const token = jwt.sign({ userId: user.user_id, email }, 'your_secret_key', {
                expiresIn: '24h' // Adjusted expiresIn value to match the format used in signup
            });
            res.status(201).json({ token, userId: user.user_id, email });
        } else {
            // Moved this line inside an else block to prevent sending multiple responses
            res.status(400).send('Invalid Credentials');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred');
    }
});

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