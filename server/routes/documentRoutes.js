const express = require("express");
const router = express.Router();
const {protect} = require('../controllers/auth.js');
const {createDoc, getDoc} = require("../controllers/doc.js");
router.post("/create", protect, createDoc);
router.post("/get", protect, getDoc);

module.exports = router;