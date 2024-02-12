require('dotenv').config();
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT;
const {connect} = require('./config/database.js');
const app = express(); // creating express.js application
app.use(express.json()); // to parse incoming json data in the request's body
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

connect()

// a route handler for the root URL ('/')
app.get("/", (req, res)=>{
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    })
});


app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`);
});