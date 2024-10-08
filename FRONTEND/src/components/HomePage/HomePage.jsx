import React from 'react';
import './homepage.css';

const HomePage = () => {
    return (
        <div className='home-page'>
            <div className="main_section">
                {/* Main image section */}
            </div>
            <div className="order-button">
                <button className="order-btn" onClick={() => window.location.href='/menu'}>
                    Order Online
                </button>
            </div>
            {/* New section for the chef */}
            <div className="chef-section">
                <div className='chef_image'>
                    <img src="/logos/chef.jpg" alt="Chef" />
                </div> 
                <div className='chef_content'>
                    <h2>Meet Our Chef</h2>
                    <p>
                        From the culinary genius of Jabbar Bhai comes the latest authentic Indian dining experience right here in Plano. 
                        With acclaimed restaurants from Chennai to Dubai and a devoted international following on social media, 
                        Chef Bhai has captivated millions with his passion for bold flavors and innovative cooking. 
                        We are thrilled to bring this extraordinary culinary adventure to the vibrant community of Texas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
