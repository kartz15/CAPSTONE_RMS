require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDb = require('./config/connectToDb');
const restaurantRoutes = require('./routes/restaurantRoutes');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Dish = require('./models/dish');

// Connect to database
connectToDb();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json()); // parse JSON bodies

// User registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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

// app.post('/dishes', upload.single('image'), async (req, res) => {
//     const { name, description, price, category } = req.body;
//     if (!req.file) {
//         return res.status(400).json({ message: 'Image file is required' });
//     }
//     const dish = new Dish({
//         name,
//         description,
//         price,
//         image: req.file.path,
//         category, 
//     });
//     try {
//         await dish.save();
//         res.status(201).json(dish);
//         setSuccessMessage('Dish added successfully!');
        
//         // Clear form fields
//         // ... existing code
        
//         // Clear message after 3 seconds
//         setTimeout(() => {
//             setSuccessMessage('');
//         }, 3000);
//     } catch (error) {
//         res.status(400).json({ message: 'Dish validation failed', error });
//     }
// });
app.post('/dishes', upload.single('image'), async (req, res) => {
    const { name, description, price, category } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }
    const dish = new Dish({
        name,
        description,
        price,
        image: req.file.path,
        category, 
    });
    try {
        await dish.save();
        return res.status(201).json(dish); // Ensure you return immediately after sending the response
    } catch (error) {
        return res.status(400).json({ message: 'Dish validation failed', error });
    }
});
// Use restaurant routes
app.use('/api/restaurants', restaurantRoutes);

app.use('/uploads', express.static('uploads'));


// Start the server
app.listen(PORT, () => {
    console.log(`Server connected on port: ${PORT}`);
});
