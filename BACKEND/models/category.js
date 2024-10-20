const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    image: {
        type: String, // This will store the image URL
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


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
