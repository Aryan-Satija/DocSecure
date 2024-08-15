const {config} = require('dotenv');
config()
const cors = require('cors'); // Import the cors module to enable Cross-Origin Resource Sharing (CORS)
const express = require('express'); // Import the express module to create a web server
const fileUpload = require('express-fileupload'); // Import the express-fileupload module to handle file uploads
const authRoutes = require('./routes/authRoutes.js');
const pdfRoutes = require('./routes/pdfRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const documentRoutes = require('./routes/documentRoutes.js');
const PORT = process.env.PORT;
const {connect} = require('./config/database.js');
const app = express(); // Create an instance of the express application

connect()

app.use(
    cors({
        origin :"*",
        method:["PUT", "GET", "POST", "PATCH", "DELETE"],
        credentials: true
    })
)
    
app.use(express.json()); // to parse incoming json data in the request's body

app.use(fileUpload());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/document", documentRoutes);

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