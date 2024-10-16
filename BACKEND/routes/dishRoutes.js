const express = require('express');
const { getAllDishes, getAllDishesbycategory, uploadDish , updateDish,getDishById,deleteDish} = require('../controllers/dishController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
const cloudinary = require('../cloudinaryConfig');

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DishMenu', 
        allowed_formats: ['jpg', 'png', 'jpeg'], 
    },
});

const upload = multer({ storage });

const router = express.Router();

// GET all dishes
router.get('/', getAllDishes);
router.get('/cat/:id', getAllDishesbycategory); 
router.post('/', upload.single('image'), uploadDish);
router.put('/:id', upload.single('image'), updateDish);
router.delete('/:id', deleteDish); 

module.exports = router;
