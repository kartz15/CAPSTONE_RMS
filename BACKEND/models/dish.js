// const mongoose = require('mongoose');

// const dishSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     image: {
//         type: String, // This will store the path to the uploaded image
//         required: true,
//     },
//     category: {
//         type: String,
//         enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'], // Example categories
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Dish = mongoose.model('Dish', dishSchema);

// module.exports = Dish;
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
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'], 
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

// Check if the model already exists
const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

module.exports = Dish;
