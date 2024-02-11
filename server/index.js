const express = require('express');
const app = express(); // creating express.js application
app.use(express.json()); // to parse incoming json data in the request's body

const PORT = process.env.PORT;

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