const express = require('express');
const router = express.Router();
const {protect} = require('../controllers/auth.js');
const {pdfEncrypt} =  require('../controllers/pdf.js');

router.post('/encrypt-my-pdf', protect, pdfEncrypt);

module.exports = router;