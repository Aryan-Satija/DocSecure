const pdfParse = require('pdf-parse');
const user = require('../models/user.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

function calculateHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}


exports.pdfEncrypt = async(req, res)=>{
    try{
        if((!req.files) || (!req.files.pdfDocument)){
            return res.staus(400).json({
                success: false,
                message: 'No PDF found....'
            })
        }

        const {pdfDocument} = req.files;
        const {email} = req.user;
        const user_doc = await user.findOne({email});

        pdfParse(pdfDocument)
        .then((result)=>{
            const hash = calculateHash(result.text + user_doc.private_key)
            return res.status(200).json({
                success: true,
                hash: hash,
                public_key: user_doc.public_key
            })
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

exports.userPdfEncrypt = async (req, res) => {
    try {
        if (!req.files || !req.files.pdfDocument || !req.body.public_key) {
            return res.status(400).json({
                success: false,
                message: 'No PDF document or public key found.'
            });
        }

        const { pdfDocument } = req.files;
        const { public_key } = req.body;

        filtered_public_key = public_key.replace('public_key', '');

        const normalized_public_key = filtered_public_key.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        const user_doc = await user.findOne({ public_key : normalized_public_key });
        
        if(!user_doc){
            return res.status(400).json({
                success: false,
                message: 'invalid public key'
            })
        }
        
        pdfParse(pdfDocument)
            .then((result) => {
                const hash = calculateHash(result.text + user_doc.private_key);
                return res.status(200).json({
                    success: true,
                    hash: hash,
                });
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
};

exports.generatePrivateKey = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(500).json({
                success: false,
                message: 'No credentials'
            })
        }

        let existing_user = await user.findOne({email});

        const jury = await bcrypt.compare(password, existing_user.password);

        if(jury){
            return res.status(200).json({
                success: true,
                private_key: existing_user.private_key
            })
        }   
        else{
            return res.status(401).json({
                success: false,
                message: 'incorrect credentials'
            })
        }
    } catch(err){
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}
