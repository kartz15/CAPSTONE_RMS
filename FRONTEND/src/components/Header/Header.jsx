// import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = ({ cartCount }) => { 
    return (
        <header>
            <nav className="nav_container">
                <div className="nav_logo">
                    <Link to="/"><img src="/logos/sitelogo.jpg" alt="Site Logo" className="logo" /></Link>
                </div>
                <div className="nav_links">
                    {/* <Link className="nav_link" id="nav_id" to="/menu">ORDER NOW</Link> */}
                    <Link className="nav_link" to="/">              <i class="fa-solid fa-house"></i> Home</Link>
                    <Link className="nav_link" to="/menu">          <i class="fa-solid fa-bars"></i> Menu</Link>
                    <Link className="nav_link" to="/login">         <i class="fa-solid fa-right-to-bracket"></i> Sign In</Link> 
                    <Link className="nav_link" to="/cart">          <i className="fas fa-shopping-cart"></i> Cart ({cartCount})</Link> 
                    <Link className='nav_link' to="/order-history"> <i class="fa-solid fa-clock-rotate-left"></i> Orders</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
