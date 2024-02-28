const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5
    }
});

otpSchema.pre("save", async(next)=>{
    if(this.isNew){
        console.log('sending email....');
    }
    next();
})

module.exports = mongoose.model('OTP', otpSchema);