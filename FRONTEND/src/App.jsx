import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import MenuPage from './components/MenuPage/MenuPage';
import AdminPage from './components/AdminPage/AdminPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import CartPage from './components/CartPage/CartPage';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import OrderSummaryPage from './components/OrderSummaryPage/OrderSummaryPage'; 
import OrderHistory from './components/OrderHistroy/OrderHistroy';
import './App.css'


const App = () => {
    const navigate = useNavigate(); // Initialize navigate here
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [cart, setCart] = useState([]);

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
        navigate('/login'); 
    };

    const addToCart = (dish) => {
        setCart((prevCart) => [...prevCart, dish]);
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCart([]); 
    };

    return (
        <>
            <div className="nav_titlebar">Win $500! Enter by writing a dish review to help others. Drawing 11/1</div>
            <Header cartCount={cart.length} /> 
            <Navbar username={username} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
                <Route path="/admin" element={username === "admin" ? <AdminPage /> : <Navigate to="/" />} />
                <Route path="/login" element={token ? <Navigate to={username === "admin" ? "/admin" : "/"} /> : <LoginPage setToken={handleSetToken}/>} />
                <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
                <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} username={username} />} />
                <Route path="/order-summary/:orderId" element={<OrderSummaryPage />} />
                <Route path="/order-history" element={<OrderHistory username={username} />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
