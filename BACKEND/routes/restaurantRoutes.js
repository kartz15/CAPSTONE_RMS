// const express = require('express');
// const Restaurant = require('../models/restaurant');
// const router = express.Router();

// // Get all restaurants
// router.get('/', async (req, res) => {
//     try {
//         const restaurants = await Restaurant.find();
//         res.json(restaurants);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Create a new restaurant
// router.post('/', async (req, res) => {
//     const restaurant = new Restaurant(req.body);
//     try {
//         const newRestaurant = await restaurant.save();
//         res.status(201).json(newRestaurant);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;
const express = require('express');
const Dish = require('../models/dish'); // Adjust the path as needed
const router = express.Router();

// GET all dishes
router.get('/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find(); // Fetch all dishes
        res.json(dishes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
