const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middlewarw/auth');

// Public routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Protected route
router.get('/:id', auth, userController.getUserById); // Only accessible with valid token

module.exports = router;
