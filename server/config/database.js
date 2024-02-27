const mongoose = require('mongoose');
require('dotenv').config();
exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Connection established successfull');
    })
    .catch((err)=>{
        console.log('Database connection failed');
        console.log(err);
        process.exit(1);
    })
}