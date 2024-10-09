import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MenuPage.css';

const MenuPage = ({ addToCart }) => {
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dishes');
                setDishes(response.data);
            } catch (err) {
                console.error('Error fetching dishes:', err);
                setError('Failed to load dishes');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setError('Failed to load categories');
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchDishes(), fetchCategories()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCategorySelect = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    if (loading) return <h2 className="loading">Loading...</h2>;
    if (error) return <h2 className="error">{error}</h2>;

    return (
        <div className="menu-container">
            <h1 className="menu-title" style={{ cursor: 'pointer' }}>
                Menu
            </h1>
            <div className="category-container">
                <div className="category-grid">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="category-card"
                            onClick={() => handleCategorySelect(category._id)}
                        >
                            <div
                                className="category-image"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                            <div className="category-name">{category.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="dish-grid">
                {dishes.map((dish) => (
                    <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
                ))}
            </div> */}
        </div>
    );
};

// const DishCard = ({ dish, addToCart }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleAddToCart = () => {
//         if (quantity <= 0) {
//             setSuccessMessage("Please enter a valid quantity.");
//             return;
//         }
//         const itemToAdd = { ...dish, quantity: Number(quantity) }; 
//         addToCart(itemToAdd);
//         setSuccessMessage(`${dish.name} has been added to your cart! Quantity: ${quantity}`);
//         setQuantity(1);
        
//         setTimeout(() => {
//             setSuccessMessage('');
//         }, 3000);
//     };

//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p className="description">{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//             <input 
//                 type="number" 
//                 value={quantity} 
//                 min="1" 
//                 onChange={(e) => setQuantity(Number(e.target.value))} 
//             />
//             <button onClick={handleAddToCart}>
//                 <i className="fas fa-shopping-cart"></i> Add to Cart
//             </button>
//             {successMessage && <p className="success-message">{successMessage}</p>}
//         </div>
//     );
// };

export default MenuPage;
