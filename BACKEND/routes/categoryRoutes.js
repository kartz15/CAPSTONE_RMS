const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Correct import
const cloudinary = require('../cloudinaryConfig');
const { getAllCategories, uploadCategory } = require('../controllers/categoryController');

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CategoryItems', // Optional: Specify a folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Use 'allowed_formats' instead of 'allowedFormats'
    },
});

const upload = multer({ storage });

router.get('/', getAllCategories);
router.post('/', upload.single('image'), uploadCategory);

// You can add more endpoints like updating and deleting categories as needed
module.exports = router;
