import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            const response = await axios.post('https://capstone-rms.onrender.com/api/users/login', { username, password });
            const token = response.data.token;
            setToken(token, username);
            alert('Logged in successfully!');
            // navigate('/'); // Redirect after login
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
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
                <button type="submit" className="login-button">Login</button>
            </form>
            <Link className="register-link" to="/register">Don't have an account? Register</Link>
        </div>
    );
};

export default LoginPage;
