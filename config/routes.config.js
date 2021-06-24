const express = require('express');
const auth = require('../controllers/auth.controller')
const router = express.Router();

router.get('/register', auth.register);



module.exports = router;