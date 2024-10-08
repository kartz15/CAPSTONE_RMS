// import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = ({ cartCount }) => { 
    return (
        <header>
            <nav className="nav_container">
                <div className="nav_logo">
                    <Link to="/"><img src="/logos/chef.jpg" alt="Site Logo" className="logo" /></Link>
                </div>
                <div className="nav_links">
                    <Link className="nav_link" id="nav_id" to="/menu">ORDER NOW</Link>
                    <Link className="nav_link" to="/">Home</Link>
                    <Link className="nav_link" to="/menu">Menu</Link>
                    <Link className="nav_link" to="/login">Sign In</Link> 
                    <Link className="nav_link" to="/cart">Cart ({cartCount})</Link> 
                    <Link className='nav_link' to="/order-history">Orders</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
