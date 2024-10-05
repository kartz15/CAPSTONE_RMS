const express = require('express');
const { getAllDishes, uploadDish } = require('../controllers/dishController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Correct import
const cloudinary = require('../cloudinaryConfig');

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DishMenu', // Optional: Specify a folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Use 'allowed_formats' instead of 'allowedFormats'
    },
});

const upload = multer({ storage });

const router = express.Router();

// GET all dishes
router.get('/', getAllDishes);

// Route for uploading dishes
router.post('/', upload.single('image'), uploadDish);

module.exports = router;
