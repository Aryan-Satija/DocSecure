const user = require('../models/user.js');
exports.fetchProfile = async(req, res)=>{
    try{
        const {email} = req.user;
        const user_doc = await user.findOne({email: email});
        return res.status(200).json({
            success: true,
            data: user_doc
        })
    } catch(err){
        return res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}