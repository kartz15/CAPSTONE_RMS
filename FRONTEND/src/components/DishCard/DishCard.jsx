import React from 'react';
import './DishCard.css'; 

const DishCard = ({ dish }) => {
    const imageUrl = `http://localhost:5000/${dish.image}`;
    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>${dish.price.toFixed(2)}</p>
            {dish.image && <img src={imageUrl} alt={dish.name} />}
        </div>
    );
};

export default DishCard;
