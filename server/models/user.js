const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['Validator', 'Creator'],
        required: true
    },
    public_key:{
        type: String,
        required: true
    },
    private_key: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
});
module.exports = mongoose.model('user', userSchema);