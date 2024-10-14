import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal/OrderModal'; 
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, clearCart, username }) => {
    const navigate = useNavigate();
    const [pickupTime, setPickupTime] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [quantities, setQuantities] = useState(() =>
        cart.reduce((acc, item) => {
            acc[item._id] = item.quantity || 1; 
            return acc;
        }, {})
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [estimatedTotal, setEstimatedTotal] = useState(0);

    useEffect(() => {
        calculateTotals();
    }, [quantities, cart]);

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, Number(value)), 
        }));
    };

    const calculateTotals = () => {
        const currentSubtotal = cart.reduce((total, item) => {
            const quantity = quantities[item._id] || 1; 
            return total + (item.price * quantity);
        }, 0);
        const currentTax = currentSubtotal * 0.06; 
        const currentEstimatedTotal = currentSubtotal + currentTax;

        setSubtotal(currentSubtotal);
        setTax(currentTax);
        setEstimatedTotal(currentEstimatedTotal);
    };

    const handleCheckout = async () => {
        if (!username) {
            setError('You need to be logged in to proceed with checkout.');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty. Please add items to your cart before checking out.');
            return;
        }

        if (!pickupTime) {
            setError('Please select a pickup time.');
            return;
        }

        setLoading(true);
        setError('');

        let userId;
        try {
            const userResponse = await axios.get(`http://localhost:5000/api/users`, { params: { username } });
            userId = userResponse.data._id; 
        } catch (error) {
            setError(`Error fetching user ID: ${error.message}`);
            setLoading(false);
            return;
        }

        const orderData = {
            userId,
            items: cart.map(item => ({ 
                dishId: item._id, 
                quantity: quantities[item._id] || 1,
                dishName: item.name, 
                dishPrice: item.price 
            })),
            pickupTime,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/orders', orderData);
            const orderNumber = response.data._id;
            setOrderNumber(orderNumber);
            setOrderDetails(orderData.items); 
            setIsModalOpen(true); 
            // clearCart(); 
        } catch (error) {
            setError(`Error: ${error.response ? error.response.data.error : error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h1>Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty. Please add items to your cart to proceed.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item._id} className="cart-card">
                            <div className="cart-card-content">
                                <div className="cart-text">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>
                                        Quantity: 
                                        <input
                                            type="number"
                                            value={quantities[item._id] || 1}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                            className="quantity-input"
                                        />
                                    </p>
                                    <p>Total: ${(item.price * (quantities[item._id] || 1)).toFixed(2)}</p>
                                    <button className="remove-button" onClick={() => removeFromCart(item._id)}>Remove</button>
                                </div>
                                {item.image && (
                                    <img src={item.image} alt={item.name} className="cart-image" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-summary">
                <h2>Order Summary</h2>
                <p>Need plates and/or utensils?</p>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <h3>Estimated Total: ${estimatedTotal.toFixed(2)}</h3>

                <div>
                    <label htmlFor="pickup-time">Select Pickup Time:</label>
                    <input
                        type="datetime-local"
                        id="pickup-time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                </div>

                <button 
                    className="checkout-button" 
                    onClick={handleCheckout}
                    disabled={loading} 
                >
                    {loading ? 'Processing...' : 'Checkout'}
                </button>
            </div>

            {/* Modal for Order Summary */}
            <Modal isOpen={isModalOpen} onClose={() =>  {
                    setIsModalOpen(false);
                    setOrderNumber('');
                    setOrderDetails([]);
                    setSubtotal(0);
                    setTax(0);
                    setEstimatedTotal(0); 
                    setPickupTime('');
                    clearCart(); 
                }} className="modal">
                    <h2 className="order-summary">Order Summary</h2>
                    <p>Your order number is: <strong>{orderNumber}</strong></p>
                    <h3>Order Details:</h3>
                    <ul>
                        {orderDetails.map((item) => (
                            <li key={item.dishId}>
                                {item.dishName} - Quantity: {quantities[item.dishId]} - Price: ${(item.dishPrice * (quantities[item.dishId] || 1)).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <h3>Estimated Total: ${estimatedTotal.toFixed(2)}</h3>
                    <p>Pickup Time: {pickupTime}</p>
                    <p>Thank you for your order!</p>
                </Modal>

        </div>
    );
};

export default CartPage;
