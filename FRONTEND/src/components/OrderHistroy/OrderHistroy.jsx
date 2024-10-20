import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistroy.css'; 

const OrderHistory = ({ username }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                // const response = await axios.get(`http://localhost:5000/api/orders/user/${username}`);
                const response = await axios.get(`https://capstone-rms.onrender.com/api/orders/user/${username}`);
                setOrders(response.data);
            } catch (error) {
                setError('Error fetching orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchOrders();
        }
    }, [username]);

    return (
        <div className="order-history-container">
            <h1>Your Order History</h1>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order._id} className="order-item">
                            <div className="order-details">
                                <h3>Order ID: {order._id}</h3>
                                <p>Pickup Time: {new Date(order.pickupTime).toLocaleString()}</p>
                                <p>Items:</p>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={`${item.dishId}-${index}`} className="order-item-details">
                                            {item.dishName} (Quantity: {item.quantity}) - Price: ${(item.dishPrice * item.quantity).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <p>Total: ${(order.items.reduce((total, item) => total + (item.dishPrice * item.quantity), 0)).toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
