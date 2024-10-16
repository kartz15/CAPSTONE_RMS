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

// // Fetch all dishes
const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// // Fetch all dishes with optional category filter
// const getAllDishesbycategory = async (req, res) => {
//     const { category } = req.query; // Get category from query parameters

//     try {
//         const filter = category ? { category } : {}; // Filter by category if provided
//         const dishes = await Dish.find(filter).populate('category'); // Populate category info
//         res.json(dishes);
//     } catch (error) {
//         console.error('Error fetching dishes:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const getAllDishesbycategory = async (req, res) => {
    const { id } = req.params; // Get category ID from URL parameters

    try {
        // Filter by category ID
        const dishes = await Dish.find({ category: id }).populate('category'); 
        
        if (dishes.length === 0) {
            return res.status(404).json({ message: 'No dishes found for this category' });
        }
        
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getDishById = async (req, res) => {
    const { id } = req.params;

    try {
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.status(200).json(dish);
    } catch (error) {
        console.error('Error fetching dish:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
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
            public_id: result.public_id, 
            category,
        });

        await dish.save();
        return res.status(201).json(dish);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateDish = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    try {
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        if (name) dish.name = name;
        if (description) dish.description = description;
        if (price) dish.price = price;
        if (category) dish.category = category;

        // Handle image update if a new image is uploaded
        if (req.file) {
            // Delete the old image from Cloudinary
            const publicId = dish.public_id;
            await cloudinary.uploader.destroy(publicId); 

            // Upload the new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            dish.image = result.secure_url; 
            dish.public_id = result.public_id; 
        }
        // Save updated dish
        const updatedDish = await dish.save();
        res.status(200).json(updatedDish);
    } catch (error) {
        console.error('Error updating dish:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


const deleteDish = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the dish to get the public ID of the image
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Extract the public ID from the image URL
        const publicId = dish.public_id; 

        // Delete the image from Cloudinary
        const deleteResponse = await cloudinary.uploader.destroy(publicId);
        console.log('Cloudinary delete response:', deleteResponse);
        if (deleteResponse.result !== 'ok') {
            throw new Error(`Failed to delete image: ${deleteResponse.result}`);
        }

        // Delete the dish from the database
        await Dish.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        console.error('Error deleting dish:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { getAllDishes,getAllDishesbycategory, uploadDish, updateDish ,getDishById ,deleteDish} ;
