import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const Navbar = ({ username, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
            {username ? (
                <>
                    <span>Welcome {username} !</span>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
             </div>
        </nav>
    );
};

export default Navbar;
