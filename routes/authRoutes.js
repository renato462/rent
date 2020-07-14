const express = require('express');

const authController = require('../controller/authController');

const router = express.Router();

// GET
router.get('/login', authController.getLogin);
router.get('/register', authController.getRegister);

//POST_LOGIN

router.post('/login', authController.postLogin);
router.post('/register', authController.postRegister);


module.exports = router;
