const createdoc = require("../models/createdoc.js");
const user = require("../models/user.js");
exports.createDoc = async(req, res)=>{
    const {name, txHash} = req.body;
    const creator = req.user.id;
    
    if(!creator || !txHash) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        })
    }
    try{
        const newdoc = await createdoc.create({name, creator, txHash});
        res.status(200).json({
            success: true,
            message: "Document created successfully",
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
exports.getDoc = async(req, res)=>{
    const id = req.user.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        })
    }
    try{
        const docs = await createdoc.find({creator:id})
        return res.status(200).json({
            success: true,
            data: docs
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}