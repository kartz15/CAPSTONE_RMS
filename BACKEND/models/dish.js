const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // This will store the path to the uploaded image
        required: true,
    },
    public_id: {
        type: String, // Cloudinary public ID for the image
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

module.exports = Dish;

