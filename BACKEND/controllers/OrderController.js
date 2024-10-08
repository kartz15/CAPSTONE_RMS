const Order = require('../models/order');
const User = require('../models/user')
const Dish =require('../models/dish')

// Create an order
// const createOrder = async (req, res) => {
//     const { userId, items, pickupTime } = req.body;
//     try {
//         const newOrder = new Order({ userId, items, pickupTime });
//         const savedOrder = await newOrder.save();
//         res.status(201).json({ orderNumber: savedOrder._id });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const createOrder = async (req, res) => {
    const { userId, items, pickupTime } = req.body;

    // Retrieve dish details to save in order
    const orderItems = await Promise.all(items.map(async (item) => {
        const dish = await Dish.findById(item.dishId);
        return {
            dishId: item.dishId,
            dishName: dish.name,
            dishDescription: dish.description,
            dishPrice: dish.price,
            quantity: item.quantity,
        };
    }));

    const newOrder = new Order({ userId, items: orderItems, pickupTime });
    await newOrder.save();
    res.status(201).json(newOrder);
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId items.dishId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate('userId items.dishId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrdersByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const orders = await Order.find({ userId: user._id }).populate('items.dishId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUsername
};
