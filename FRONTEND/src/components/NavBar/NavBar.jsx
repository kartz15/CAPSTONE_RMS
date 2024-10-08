import React from 'react';
import './NavBar.css';

const Navbar = ({ username, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                {username && (
                    <span className="welcome-message">Welcome {username}!</span>
                )}
            </div>
            {username && (
                <button onClick={onLogout} className="logout-button">Logout</button>
            )}
        </nav>
    );
};
export default Navbar;

