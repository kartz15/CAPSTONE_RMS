require('dotenv').config();
const cors = require("cors");
const express = require('express');
const connectToDb = require('./config/connectToDb');
const userRoutes = require('./routes/userRoutes');
const dishRoutes = require('./routes/dishRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectToDb();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server connected on port: ${PORT}`);
});
