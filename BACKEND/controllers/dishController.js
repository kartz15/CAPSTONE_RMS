const Dish = require('../models/dish');
const cloudinary = require('../cloudinaryConfig');

// Test Cloudinary connection
cloudinary.api.ping()
    .then((result) => {
        console.log('Cloudinary connection successful:', result);
    })
    .catch((error) => {
        console.error('Error connecting to Cloudinary:', error);
    });

// Fetch all dishes
const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Upload dish
const uploadDish = async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'Only image files are allowed' });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log('Upload result:', result);

        const dish = new Dish({
            name,
            description,
            price,
            image: result.secure_url,
            category,
        });

        await dish.save();
        return res.status(201).json(dish);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllDishes, uploadDish };
