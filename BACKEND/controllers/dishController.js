// const Dish = require('../models/dish');
// const cloudinary = require('../cloudinaryConfig');

// // Test Cloudinary connection
// cloudinary.api.ping()
//     .then((result) => {
//         console.log('Cloudinary connection successful:', result);
//     })
//     .catch((error) => {
//         console.error('Error connecting to Cloudinary:', error);
//     });

// // Fetch all dishes
// const getAllDishes = async (req, res) => {
//     try {
//         const dishes = await Dish.find();
//         res.json(dishes);
//     } catch (error) {
//         console.error('Error fetching dishes:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Upload dish
// const uploadDish = async (req, res) => {
//     const { name, description, price, category } = req.body;

//     if (!req.file) {
//         return res.status(400).json({ message: 'Image file is required' });
//     }

//     if (!req.file.mimetype.startsWith('image/')) {
//         return res.status(400).json({ message: 'Only image files are allowed' });
//     }

//     try {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         console.log('Upload result:', result);

//         const dish = new Dish({
//             name,
//             description,
//             price,
//             image: result.secure_url,
//             category,
//         });

//         await dish.save();
//         return res.status(201).json(dish);
//     } catch (error) {
//         console.error('Error uploading to Cloudinary:', error);
//         return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// module.exports = { getAllDishes, uploadDish };

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
            public_id: result.public_id, // Store public ID
            category,
        });

        await dish.save();
        return res.status(201).json(dish);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update dish
// const updateDish = async (req, res) => {
//     const { id } = req.params; // Get the dish ID from the request parameters
//     const { name, description, price, category } = req.body; // Get other fields from request body
//     try {
//         // Find the dish by ID
//         const dish = await Dish.findById(id);
//         if (!dish) {
//             return res.status(404).json({ message: 'Dish not found' });
//         }

//         // Update fields if provided
//         if (name) dish.name = name;
//         if (description) dish.description = description;
//         if (price) dish.price = price;
//         if (category) dish.category = category;

//         // Handle image update if a new image is uploaded
//         if (req.file) {
//             // Upload new image to Cloudinary
//             const result = await cloudinary.uploader.upload(req.file.path);
//             dish.image = result.secure_url; // Update image URL
//             dish.public_id = result.public_id; // Store public ID
//         }
      

//         // Save updated dish
//         const updatedDish = await dish.save();
//         res.status(200).json(updatedDish);
//     } catch (error) {
//         console.error('Error updating dish:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

const updateDish = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    try {
        // Find the dish by ID
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Update fields if provided
        if (name) dish.name = name;
        if (description) dish.description = description;
        if (price) dish.price = price;
        if (category) dish.category = category;

        // Handle image update if a new image is uploaded
        if (req.file) {
            // Delete the old image from Cloudinary
            const publicId = dish.public_id; // Get the public ID of the old image
            await cloudinary.uploader.destroy(publicId); // Delete the old image

            // Upload the new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            dish.image = result.secure_url; // Update image URL
            dish.public_id = result.public_id; // Store new public ID
        }

        // Save updated dish
        const updatedDish = await dish.save();
        res.status(200).json(updatedDish);
    } catch (error) {
        console.error('Error updating dish:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// const deleteDish = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const dish = await Dish.findByIdAndDelete(id);
//         if (!dish) {
//             return res.status(404).json({ message: 'Dish not found' });
//         }
//         res.status(200).json({ message: 'Dish deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting dish:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const deleteDish = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Fetch the dish to get the public ID of the image
//         const dish = await Dish.findById(id);
//         if (!dish) {
//             return res.status(404).json({ message: 'Dish not found' });
//         }

//         // Delete the image from Cloudinary
//         const publicId = dish.image.split('/').pop().split('.')[0]; // Extract public ID from URL
//         await cloudinary.uploader.destroy(publicId); // Use Cloudinary's destroy method

//         // Delete the dish from the database
//         await Dish.findByIdAndDelete(id);
        
//         res.status(200).json({ message: 'Dish deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting dish:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const deleteDish = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the dish to get the public ID of the image
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Extract the public ID from the image URL
        const publicId = dish.public_id; // This should be the stored public ID from your schema

        // Delete the image from Cloudinary
        // await cloudinary.uploader.destroy(publicId, { type: 'upload' }); // Specify the type as 'upload'
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


module.exports = { getAllDishes, uploadDish, updateDish ,getDishById ,deleteDish} ;
