const express = require('express');
const router = express.Router();

const {pdfEncrypt} =  require('../controllers/pdf.js');

router.post('/encrypt-my-pdf', pdfEncrypt);

module.exports = router;