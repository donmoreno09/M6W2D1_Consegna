const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/UserSchema');


const app = express();
const PORT = process.env.PORT || 3004;


//Connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

//Routes
app.get('/users', async (request, response) => {
    try {
        const users = await User.find();
        response.json(users);
    } catch (error) {
        response.status(500).json({ message : err.message })
    }
})

// isActive
app.get('/users/active', async (request, response) => {
    try {
        const activeUsers = await User.find({isActive : true});
        response.json(activeUsers);
    } catch (error) {
        response.status(500).json({message : error.message})
    }
})


// age > 26
app.get('/users/age26', async (request, response) => {
    try {
        const age26 = await User.find({ age: { $gt: 26 } });
        response.json(age26);
    } catch (error) {
        response.status(500).json({message : error.message})
    } 
});

// age > 26 e <= 30
app.get('/users/age-between', async (request, response) => {
    try {
        const users = await User.find({ age: { $gt: 26, $lte: 30 } });
        response.json(users);
    } catch (error) {
        response.status(500).json({message : error.message})
    } 
});

// eyes brown o blue
app.get('/users/eyes-brown-blue', async (request, response) => {
    try {
        const users = await User.find({ eyeColor: { $in: ['brown', 'blue'] } });
        response.json(users);
    } catch (error) {
        response.status(500).json({message : error.message})
    } 
});

// eyes non è green
app.get('/users/eyes-not-green', async (request, response) => {
    try {
        const users = await User.find({ eyeColor: { $ne: 'green' } });
        response.json(users);
    } catch (error) {
        response.status(500).json({message : error.message})
    } 
});

// eyes non è green e non è blue
app.get('/users/eyes-not-green-blue', async (request, response) => {
    try {
        const users = await User.find({ eyeColor: { $nin: ['green', 'blue'] } });
        response.json(users);
    } catch (error) {
        response.status(500).json({message : error.message})
    } 
});

// company uguale a FITCORE e ritorna solo l'email
app.get('/users/fitcore-email', async (request, response) => {
    try {
        const users = await User.find({ company: "FITCORE" }).select('email');
        response.json(users);
    } catch (error) {
        response.status(500).json({message : error.message})
    } 
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});