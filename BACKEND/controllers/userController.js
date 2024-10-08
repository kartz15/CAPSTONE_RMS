// // const User = require('../models/user');
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');

// // // User registration
// // const registerUser = async (req, res) => {
// //     try {
// //         const { username, password } = req.body;

// //         // Check if user already exists
// //         const existingUser = await User.findOne({ username });
// //         if (existingUser) {
// //             return res.status(400).json({ message: 'Username already exists' });
// //         }

// //         // Hash the password
// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const user = new User({ username, password: hashedPassword });
// //         await user.save();

// //         res.status(201).json({ message: 'User registered successfully' });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };

// // // User login
// // const loginUser = async (req, res) => {
// //     try {
// //         const { username, password } = req.body;
// //         const user = await User.findOne({ username });

// //         if (!user || !(await bcrypt.compare(password, user.password))) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //         res.json({ token });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };


// // const getUserByUsername = async (req, res) => {
// //     const { username } = req.query; // Assuming you pass the username as a query parameter
// //     try {
// //         const user = await User.findOne({ username });
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }
// //         res.status(200).json(user);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // module.exports = { registerUser, loginUser , getUserByUsername};
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // User registration
// const registerUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Basic validation
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username and password are required' });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security
//         const user = new User({ username, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // User login
// const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Basic validation
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username and password are required' });
//         }

//         const user = await User.findOne({ username });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Get user by username
// const getUserByUsername = async (req, res) => {
//     const { username } = req.query; // Assuming you pass the username as a query parameter

//     if (!username) {
//         return res.status(400).json({ message: 'Username is required' });
//     }

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = { registerUser, loginUser, getUserByUsername };
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

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
};

// Get user by username
const getUserByUsername = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserByUsername };
