const express = require('express');
const { getAllDishes, uploadDish } = require('../controllers/dishController');
const multer = require('multer');
const path = require('path');

// Setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

const router = express.Router();

// GET all dishes
router.get('/', getAllDishes);

// Route for uploading dishes
router.post('/', upload.single('image'), uploadDish);

module.exports = router;
