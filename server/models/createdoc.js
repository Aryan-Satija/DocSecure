const mongoose = require("mongoose");

const createDocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '-------- no name --------'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    txHash: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    starred: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("createdoc", createDocumentSchema);