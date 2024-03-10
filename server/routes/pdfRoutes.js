const express = require('express');
const router = express.Router();
const {protect} = require('../controllers/auth.js');
const {pdfEncrypt, userPdfEncrypt} =  require('../controllers/pdf.js');

router.post('/encrypt-my-pdf', protect, pdfEncrypt);
// router.post('/encrypt-user-pdf', protect, userPdfEncrypt);
router.post('/encrypt-user-pdf', userPdfEncrypt);

module.exports = router;