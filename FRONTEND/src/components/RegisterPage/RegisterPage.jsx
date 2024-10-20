import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; 
import {  Link } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // const response = await axios.post('http://localhost:5000/api/users/register', {username, password, });
            const response = await axios.post('https://capstone-rms.onrender.com/api/users/register', { username, password });
            alert('User registered successfully!');
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Registration failed. Please try again');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <Link className="login-link" to="/login">Have an account? Login Here</Link>
        </div>
    );
};

export default RegisterPage;
