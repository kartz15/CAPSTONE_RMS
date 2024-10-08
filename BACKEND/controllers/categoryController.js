const Category = require('../models/category'); // Correctly import the model
const cloudinary = require('../cloudinaryConfig');

// Test Cloudinary connection
cloudinary.api.ping()
    .then((result) => {
        console.log('Cloudinary connection successful:', result);
    })
    .catch((error) => {
        console.error('Error connecting to Cloudinary:', error);
    });

// Fetch all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new category
const uploadCategory = async (req, res) => {
    const { name } = req.body; // Removed image from body since it's uploaded

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'Only image files are allowed' });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log('Upload result:', result);

        const newCategory = new Category({
            name,
            image: result.secure_url // Use the URL from Cloudinary
        });

        await newCategory.save();
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ message: 'Error creating category', error });
    }
};

module.exports = { getAllCategories, uploadCategory };
