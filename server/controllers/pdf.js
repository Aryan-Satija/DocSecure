const pdfParse = require('pdf-parse');
const user = require('../models/user.js');
const crypto = require('crypto');

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

        const user_doc = await user.findOne({ public_key });

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
                    public_key: user_doc.public_key
                });
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
};

