// ServiceProvider routes
const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controller/serviceProviderController');

router.get('/', serviceProviderController.getProviders);
router.post('/', serviceProviderController.createProvider);

module.exports = router;
