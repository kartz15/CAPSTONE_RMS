require('dotenv').config();
const cors = require("cors");
const express = require('express');
const connectToDb = require('./config/connectToDb');
const userRoutes = require('./routes/userRoutes');
const dishRoutes = require('./routes/dishRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectToDb();

// Middleware
app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());
app.use(express.json({limit:"150mb"}))
// Routes
app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server connected on port: ${PORT}`);
});
// require('dotenv').config();
// const cors = require("cors");
// const express = require('express');
// const connectToDb = require('./config/connectToDb');
// const userRoutes = require('./routes/userRoutes');
// const dishRoutes = require('./routes/dishRoutes');
// const cloudinary = require('cloudinary').v2;

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to database
// connectToDb();

//   // Configuration
//   cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
// });

// // Middleware
// app.use(cors({ origin: true, credentials: true }));
// // app.use(express.json());
// app.use(express.json({limit:"150mb"}))

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/dishes', dishRoutes);

// // Serve static files
// app.use('/uploads', express.static('uploads'));


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server connected on port: ${PORT}`);
// });
