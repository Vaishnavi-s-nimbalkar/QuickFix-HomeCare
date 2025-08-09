const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Give feedback and rating for an order
router.patch('/:orderId/feedback', orderController.giveFeedback);
// Cancel an order
router.patch('/:orderId/cancel', orderController.cancelOrder);
// Get new orders (notifications) for a provider
router.get('/provider/:providerId/notifications', orderController.getNewOrdersForProvider);
// Update order status
router.patch('/:orderId/status', orderController.updateOrderStatus);
// Create a new order (booking)
router.post('/', orderController.createOrder);
// Get all orders for a user
router.get('/user/:userId', orderController.getOrdersByUser);
// Get all orders for a provider
router.get('/provider/:providerId', orderController.getOrdersByProvider);

module.exports = router;
