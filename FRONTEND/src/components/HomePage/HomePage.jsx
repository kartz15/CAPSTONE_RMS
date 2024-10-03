import React from 'react';
import './homepage.css';

const HomePage = () => {
    return (
        <div>
            <main className="main">
                <h2>Welcome to Our Restaurant</h2>
                <p>Your one-stop destination for delicious meals!</p>
                <img 
                    src="/logos/restaurant_image.jpg" 
                    alt="Restaurant" 
                />
                <button 
                    className="order-button"
                    onClick={() => window.location.href='/order'} 
                >
                    Order Online
                </button>
            </main>
        </div>
    );
};

export default HomePage;

