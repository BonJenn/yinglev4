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
        const database = client.db('app-data');
        const users = database.collection('users');
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

       res.status(201).json({ token, userId: generatedUserID })

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
            res.status(201).json({ token, userId: user.user_id });
        } else {
            // Moved this line inside an else block to prevent sending multiple responses
            res.status(400).send('Invalid Credentials');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred');
    }
});



//
app.get('/user', async (req, res) => { // Added 'async' and fixed arrow function syntax
    const client = new MongoClient(uri);
    const userId = req.query.userId; // Changed from req.params to req.query for query parameters
    
    console.log('userId', userId)

    try {
        await client.connect(); // Fixed typo in 'connect'
        const database = client.db('app-data');
        const users = database.collection('users');

        const query = { user_id: userId };
        const user = await users.findOne(query);

        res.send(user);
    } catch (error) { // Added catch block to handle errors
        console.error("Failed to fetch user:", error);
        res.status(500).send("An error occurred while fetching the user.");
    } finally {
        await client.close();
    }
});



app.get('/users', async (req, res) => {
    const client = new MongoClient(uri);
    const userIds = JSON.parse(req.query.userIds);
    console.log(userIds);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const pipeline = [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ];

        const foundUsers = await users.aggregate(pipeline).toArray();
        console.log(foundUsers);
        res.send(foundUsers);

    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).send("An error occurred while fetching users.");
    } finally {
        await client.close();
    }
});




// Return Users 

app.get('/gendered-users', async (req,res) => {
    const client = new MongoClient(uri)
    const gender = req.query.gender

    console.log('gender', gender)


    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { gender_identity: { $eq : gender} }
        const foundUsers = await users.find(query).toArray() 

     
        res.send(foundUsers)

    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).send("An error occurred while fetching users.");
    } finally {
        await client.close()
    }

})

// Update a User

app.put('/user', async (req, res) => {
    const client = new MongoClient(uri);
    const formData = req.body.formData;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const query = { user_id: formData.user_id };
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches // Corrected typo from 'mathces' to 'matches'
            }
        };

        const updatedUser = await users.updateOne(query, updateDocument); // Changed variable name from 'insertedUser' to 'updatedUser' for clarity
        res.send(updatedUser);
    } finally {
        await client.close();
    }
});



app.put('/addmatch', async (req,res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body

    console.log('Updating matches for userId:', userId);

    try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');

        const query = { user_id: userId }

        const updateDocument = {
            $push: { matches: {user_id: matchedUserId}},
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }

})

app.listen(PORT, ()=> console.log('Server running on PORT ' + PORT))


