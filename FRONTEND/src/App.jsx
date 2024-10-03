import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import MenuPage from './components/MenuPage/MenuPage';
import AdminPage from './components/AdminPage/AdminPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'; 

const App = () => {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (storedToken) {
            setToken(storedToken);
            setUsername(storedUsername || '');
        }
    }, []);

    const handleSetToken = (newToken, newUsername) => {
        setToken(newToken);
        setUsername(newUsername);
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
    };

    const handleLogout = () => {
        setToken('');
        setUsername('');
        localStorage.removeItem('token'); 
        localStorage.removeItem('username'); 
    };

    return (
        <Router>
            <Header />
            <Navbar username={username} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/admin" element={token ? <AdminPage /> : <Navigate to="/admin" />} />
                <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage setToken={handleSetToken} setUsername={setUsername} />} />
                <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
            </Routes>
            <Footer /> {/* Include the Footer here */}
        </Router>
    );
};

export default App;
