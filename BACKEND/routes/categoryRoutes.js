const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
const cloudinary = require('../cloudinaryConfig');
const { getAllCategories, uploadCategory } = require('../controllers/categoryController');

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CategoryItems', 
        allowed_formats: ['jpg', 'png', 'jpeg'], 
    },
});

const upload = multer({ storage });

router.get('/', getAllCategories);
router.post('/', upload.single('image'), uploadCategory);

module.exports = router;
