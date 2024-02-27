const bcrypt = require('bcrypt');
const OTP = require('../models/otp.js');
const user = require('../models/user.js');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
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

        const user_otp = await OTP.find({email}).sort({createdAt: -1}).limit(1);

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

        await user.create({
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

exports.sendotp = async(req, res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success: false,
                message: 'email is required'
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

        await OTP.create({email, otp:user_otp});

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

exports.login = async (req, res) => { 
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            })
        }

        let existing_user = await user.findOne({email});

        if(!existing_user){
            return res.status(401).json({
                success: false,
                mesage: 'user is not registered'
            })
        }   

        if(await bcrypt.compare(password, existing_user.password)){
            const token = jwt.sign({email: existing_user.email, id: existing_user._id, accountType: existing_user.accountType}, process.env.JWT_SECRET);
            existing_user.token = token;
            existing_user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                message: 'User login success'
            });
        }
        else{
            return res.status(401).json({
                success: false, 
                message: 'incorrect password'
            })
        }
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `${err?.message ? err.message : 'something went wrong'}`
        })
    }
}