const express = require('express');
const { registerUser, loginUser ,getUserByUsername} = require('../controllers/userController');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user by username with URL parameter
// router.get('/user/:username', getUserByUsername);
router.get('/', getUserByUsername);


module.exports = router;
