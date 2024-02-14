const otp = require('../models/otp.js');
const user = require('../models/user.js');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
exports.signup = async(req, res)=>{
    try{
        const {
            username,
            email,
            password,
            accountType, 
            input_otp
        } = req.body;
        
        if(!username || !email || !password || !accountType || !input_otp){
            return res.status(400).json({
                success: false,
                message: 'all fields are mandatory'
            })
        }

        const existingUser = await user.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        const user_otp = await otp.find({email}).sort({createdAt: -1}).limit(1);

        if(user_otp.length === 0){
            return res.status(400).json({
                success: false,
                message: 'otp has expired'
            })
        }

        if(user_otp !== input_otp){
            return res.status(400).json({
                success: false,
                message: 'incorrect otp'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const new_user = await user.create({
                                            username,
                                            email,
                                            password : hashedPassword,
                                            accountType,
                                            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
                                        });
        
        return res.status(200).json({
            success: true,
            message: 'Entry Created Successfully'
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `${err?.message ? err.message : 'something went wrong'}`
        })
    }
}

exports.sendotp = async()=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }
        
        const existingUser = await user.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        var user_otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        await otp.create({email, otp});

        return res.status(200).json({
            success: true, 
            message: `otp sent successfully`
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `${err?.message ? err.message : 'something went wrong'}`
        })
    }
} 