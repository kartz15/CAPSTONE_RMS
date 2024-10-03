import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = () => {
    return (
        <header>
            <h1>Kartz Hub</h1>
            <nav>
                <div className="nav-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/menu">Menu</Link>
                    <Link className="nav-link" to="/admin">Admin</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
