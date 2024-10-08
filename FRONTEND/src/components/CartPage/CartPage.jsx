// import React, { useState } from 'react';
// import axios from 'axios';
// import './CartPage.css';
// import { useNavigate } from 'react-router-dom';

// const CartPage = ({ cart, removeFromCart, clearCart, username }) => {
//     const navigate = useNavigate();
//     const [pickupTime, setPickupTime] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [quantities, setQuantities] = useState(() =>
//         cart.reduce((acc, item) => {
//             acc[item._id] = 1;
//             return acc;
//         }, {})
//     );

//     const handleQuantityChange = (id, value) => {
//         setQuantities((prev) => ({
//             ...prev,
//             [id]: Math.max(1, Number(value)), // Ensure quantity is at mininum 1
//         }));
//     };

//     const groupedCart = cart.reduce((acc, item) => {
//         const existingItem = acc.find(i => i._id === item._id);
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             acc.push({ ...item, quantity: 1 });
//         }
//         return acc;
//     }, []);

//     const subtotal = groupedCart.reduce((total, item) => total + item.price * (quantities[item._id] || 1), 0);
//     const tax = subtotal * 0.06; // Flat tax rate of 6%
//     const estimatedTotal = subtotal + tax;

//     const handleCheckout = async () => {
//         if (!username) {
//             setError('You need to be logged in to proceed with checkout.');
//             return;
//         }

//         if (groupedCart.length === 0) {
//             setError('Your cart is empty. Please add items to your cart before checking out.');
//             return;
//         }

//         if (!pickupTime) {
//             setError('Please select a pickup time.');
//             return;
//         }

//         setLoading(true);
//         setError('');

//         let userId;
//         try {
//             const userResponse = await axios.get(`http://localhost:5000/api/users`, { params: { username } });
//             userId = userResponse.data._id; 
//         } catch (error) {
//             setError(`Error fetching user ID: ${error.message}`);
//             setLoading(false);
//             return;
//         }

//         const orderData = {
//             userId,
//             items: groupedCart.map(item => ({ 
//                 dishId: item._id, 
//                 quantity: quantities[item._id] || 1,
//                 dishName: item.name, 
//                 dishPrice: item.price 
//             })),
//             pickupTime,
//         };

//         try {
//             const response = await axios.post('http://localhost:5000/api/orders', orderData);
//             const orderNumber = response.data._id;
//             alert(`Order created successfully! Your order number is ${orderNumber}`);
            
//             clearCart();
//             navigate(`/order-summary/${orderNumber}`);
//         } catch (error) {
//             setError(`Error: ${error.response ? error.response.data.error : error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="cart-container">
//             <div className="cart-items">
//                 <h1>Your Cart</h1>
//                 {groupedCart.length === 0 ? (
//                     <p>Your cart is empty. Please add items to your cart to proceed.</p>
//                 ) : (
//                     groupedCart.map((item) => (
//                         <div key={item._id} className="cart-card">
//                             <div className="cart-card-content">
//                                 <div className="cart-text">
//                                     <h3>{item.name}</h3>
//                                     <p>Price: ${item.price.toFixed(2)}</p>
//                                     <p>
//                                         Quantity: 
//                                         <input
//                                             type="number"
//                                             value={quantities[item._id] || 1}
//                                             min="1"
//                                             onChange={(e) => handleQuantityChange(item._id, e.target.value)}
//                                             className="quantity-input"
//                                         />
//                                     </p>
//                                     <p>Total: ${(item.price * (quantities[item._id] || 1)).toFixed(2)}</p>
//                                     <button onClick={() => removeFromCart(item._id)}>Remove</button>
//                                 </div>
//                                 {item.image && (
//                                     <img src={item.image} alt={item.name} className="cart-image" />
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//             <div className="cart-summary">
//                 <h2>Order Summary</h2>
//                 <p>Need plates and/or utensils?</p>
//                 <p>Subtotal: ${subtotal.toFixed(2)}</p>
//                 <p>Tax: ${tax.toFixed(2)}</p>
//                 <h3>Estimated Total: ${estimatedTotal.toFixed(2)}</h3>

//                 <div>
//                     <label htmlFor="pickup-time">Select Pickup Time:</label>
//                     <input
//                         type="datetime-local"
//                         id="pickup-time"
//                         value={pickupTime}
//                         onChange={(e) => setPickupTime(e.target.value)}
//                     />
//                     {error && <p className="error">{error}</p>}
//                 </div>

//                 <button 
//                     className="checkout-button" 
//                     onClick={handleCheckout}
//                     disabled={loading} 
//                 >
//                     {loading ? 'Processing...' : 'Checkout'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartPage;
import React, { useState } from 'react';
import axios from 'axios';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, clearCart, username }) => {
    const navigate = useNavigate();
    const [pickupTime, setPickupTime] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [quantities, setQuantities] = useState(() =>
        cart.reduce((acc, item) => {
            acc[item._id] = 1;
            return acc;
        }, {})
    );

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, Number(value)), // Ensure quantity is at minimum 1
        }));
    };

    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i._id === item._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedCart.reduce((total, item) => total + item.price * (quantities[item._id] || 1), 0);
    const tax = subtotal * 0.06; // Flat tax rate of 6%
    const estimatedTotal = subtotal + tax;

    const handleCheckout = async () => {
        if (!username) {
            setError('You need to be logged in to proceed with checkout.');
            return;
        }

        if (groupedCart.length === 0) {
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
            items: groupedCart.map(item => ({ 
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
            alert(`Order created successfully! Your order number is ${orderNumber}`);
            
            clearCart();
            navigate(`/order-summary/${orderNumber}`);
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
                {groupedCart.length === 0 ? (
                    <p>Your cart is empty. Please add items to your cart to proceed.</p>
                ) : (
                    groupedCart.map((item) => (
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
        </div>
    );
};

export default CartPage;
