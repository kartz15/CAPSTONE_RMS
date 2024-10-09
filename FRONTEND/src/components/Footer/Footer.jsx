import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-social'>
                <div className="social-media">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Location</h3>
                    <p>Kar Restaurant</p>
                    <p>2800 W Big Beaver Rd Ste Y-323</p>
                    <p>Troy, MI 48084</p>
                    <p>(248) 600-955X</p>
                    <p>info@kar.com</p>
                </div>
                <div className="footer-section">
                    <h3>Hours</h3>
                    <p>Monday: Closed</p>
                    <p>Tuesday - Sunday: 11:00 am - 10:00 pm</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/menu">Order Online</a></li>
                        <li><a href="/menu">View Our Menu</a></li>
                        <li><a href="/register">Join Us!</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} KAR Food Hub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
