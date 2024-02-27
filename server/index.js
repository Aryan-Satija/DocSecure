require('dotenv').config();
const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const PORT = process.env.PORT;
const {connect} = require('./config/database.js');
const app = express(); // creating express.js application

connect()

app.use(
    cors({
        origin :"*",
        method:["PUT", "GET", "POST", "PATCH", "DELETE"],
        credentials: true
    })
)
    
app.use(express.json()); // to parse incoming json data in the request's body

app.use("/api/v1/auth", authRoutes);

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