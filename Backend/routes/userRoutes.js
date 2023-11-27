const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;