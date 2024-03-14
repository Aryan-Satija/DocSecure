const bcrypt = require('bcrypt');
const OTP = require('../models/otp.js');
const user = require('../models/user.js');
const crypto = require('crypto')
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const util = require('util');
const promisify = util.promisify;

function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
}

exports.protect = async(req, res, next)=>{
    try{
        const token = req.cookies?.token || req.body?.token || req.header('Authorization')?.replace('Bearer ', '')
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            })
        }

        try{
            const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err) {
            console.log(err);
            return res.status(401).json({
                success:false,
                token: token,
                error: err.message,
                message:'token is invalid',
            });
        }

        next();
    } catch(err){
        console.log(err);
        return res.status(401).json({
            success: false,
            token,
            error: err.message,
            message: 'something went wrong'
        })
    }
}


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

        console.log(user_otp);

        if(user_otp.length === 0){
            return res.status(400).json({
                success: false,
                message: 'otp has expired'
            })
        }


        if(user_otp[0].otp !== input_otp){
            return res.status(400).json({
                success: false,
                message: 'incorrect otp'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const { publicKey, privateKey } = generateKeyPair();
        const formattedPublicKey = publicKey.replace(/-{5}\s*BEGIN PUBLIC KEY\s*-{5}/, '').replace(/-{5}\s*END PUBLIC KEY\s*-{5}/, '').trim();
        const formattedPrivateKey = privateKey.replace(/-{5}\s*BEGIN PRIVATE KEY\s*-{5}/, '').replace(/-{5}\s*END PRIVATE KEY\s*-{5}/, '').trim();
        await user.create({
                                            username,
                                            email,
                                            password : hashedPassword,
                                            public_key: formattedPublicKey,
                                            private_key: formattedPrivateKey,
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
                message: 'user is not registered'
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