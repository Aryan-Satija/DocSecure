const express = require('express');
const router = express.Router();
const {protect} = require('../controllers/auth.js');
const {fetchProfile} = require('../controllers/profile.js');

router.post('/fetch-my-profile', protect, fetchProfile);

module.exports = router;