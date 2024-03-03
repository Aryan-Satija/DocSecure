const pdfParse = require('pdf-parse');

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

        pdfParse(pdfDocument)
        .then((result)=>{
            const hash = calculateHash(result.text)
            return res.status(200).json({
                success: true,
                data: hash
            })
        })

    } catch(err){
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}
