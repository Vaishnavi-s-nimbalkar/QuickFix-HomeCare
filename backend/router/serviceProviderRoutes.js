const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controller/serviceProviderController');
const auth = require('../middlewarw/auth');

// Public routes
router.get('/', serviceProviderController.getProviders);
router.post('/register', serviceProviderController.createProvider);
router.post('/login', serviceProviderController.loginProvider);

// Protected route
router.get('/:id', auth, serviceProviderController.getProviderById);

module.exports = router;
