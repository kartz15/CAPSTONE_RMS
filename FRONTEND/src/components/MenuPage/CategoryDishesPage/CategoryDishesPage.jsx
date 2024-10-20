import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategoryDishesPage.css';


const CategoryDishesPage = ({ addToCart }) => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryId); 

    useEffect(() => {
        const fetchDishesByCategory = async () => {
            try {
                // const response = await axios.get(`http://localhost:5000/api/dishes/cat/${categoryId}`);
                const response = await axios.get(`https://capstone-rms.onrender.com/api/dishes/cat/${categoryId}`);
                setDishes(response.data);
            } catch (err) {
                console.error('Error fetching dishes:', err);
                setError('Failed to load dishes');
            }
        };

        const fetchCategories = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/api/categories');
                const response = await axios.get('https://capstone-rms.onrender.com/api/categories');
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories');
            }
        };

        Promise.all([fetchDishesByCategory(), fetchCategories()]).finally(() => {
            setLoading(false);
        });
    }, [categoryId]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        navigate(`/category/${categoryId}`);
    };

    const handleBackToMenu = () => {
        navigate('/menu'); 
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className='title'>
            <h1 className="back-menu" onClick={handleBackToMenu}>Menu </h1>
            <div className="category-selector">
                {categories.map((category) => (
                    <button 
                        key={category._id} 
                        onClick={() => handleCategorySelect(category._id)} 
                        className={selectedCategory === category._id ? 'active' : ''}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="dish-grid">
                {dishes.map((dish) => (
                    <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

const DishCard = ({ dish, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');

    const handleAddToCart = () => {
        if (quantity <= 0) {
            setSuccessMessage("Please enter a valid quantity.");
            return;
        }
        const itemToAdd = { ...dish, quantity: Number(quantity) }; 
        addToCart(itemToAdd);
        setSuccessMessage(`${dish.name} has been added to your cart! Quantity: ${quantity}`);
        setQuantity(1);
        
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <p className="description">{dish.description}</p>
            <p>${dish.price.toFixed(2)}</p>
            {dish.image && <img src={dish.image} alt={dish.name} />}
            <input 
                type="number" 
                value={quantity} 
                min="1" 
                onChange={(e) => setQuantity(Number(e.target.value))} 
            />
            <button onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default CategoryDishesPage;
