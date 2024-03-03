const pdfParse = require('pdf-parse');
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
            console.log(result.text);
            return res.status(200).json({
                success: true,
                data: result.text
            })
        })

    } catch(err){
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}
