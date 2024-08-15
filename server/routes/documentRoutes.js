const express = require("express");
const router = express.Router();
const {protect} = require('../controllers/auth.js');
const {createDoc} = require("../controllers/doc.js");

router.post("/create", protect, createDoc);

module.exports = router;