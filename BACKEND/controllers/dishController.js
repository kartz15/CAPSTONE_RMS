const Dish = require('../models/dish');

// Fetch all dishes
const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Upload dish
const uploadDish = async (req, res) => {
    const { name, description, price, category } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }
    const dish = new Dish({
        name,
        description,
        price,
        image: req.file.path,
        category,
    });
    try {
        await dish.save();
        return res.status(201).json(dish);
    } catch (error) {
        return res.status(400).json({ message: 'Dish validation failed', error });
    }
};

module.exports = { getAllDishes, uploadDish };
