// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [
//         {
//             dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
//             quantity: { type: Number, required: true },
//         }
//     ],
//     pickupTime: { type: Date, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
// module.exports = Order;

const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
            dishName: { type: String, required: true }, 
            dishDescription: { type: String, required: true }, 
            dishPrice: { type: Number, required: true }, 
            quantity: { type: Number, required: true },
        }
    ],
    pickupTime: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;
