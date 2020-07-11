const express = require('express');

const authController = require('../controller/authController');

const router = express.Router();

// GET
router.get('/login', authController.getLogin);
router.get('/register', authController.getRegister)


module.exports = router;
