import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DishCard from '../DishCard/DishCard';

const MenuPage = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/restaurants/dishes');
                setDishes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load dishes');
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

    return (
        <div>
            <div style={{   display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '20px', 
                            justifyContent: 'center' 
                        }}>
                {dishes.map((dish) => (
                    <DishCard key={dish._id} dish={dish} />
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
