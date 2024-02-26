const express = require('express');
const router = express.Router();

const {login, signup, sendotp} = require('../controllers/auth.js');

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendotp);

module.exports = router;