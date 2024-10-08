const express = require('express');
const { createOrder, getAllOrders, getOrderById ,getOrdersByUsername} = require('../controllers/OrderController');
const router = express.Router();

// Create an order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get an order by ID
router.get('/:id', getOrderById);

// Get orders by username
router.get('/user/:username', getOrdersByUsername);

module.exports = router;
