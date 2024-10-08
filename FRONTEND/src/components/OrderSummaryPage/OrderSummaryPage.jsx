// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const OrderSummaryPage = () => {
//     const { orderId } = useParams();
//     const [orderDetails, setOrderDetails] = useState(null);

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             if (orderId) {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
//                     setOrderDetails(response.data);
//                 } catch (error) {
//                     console.error('Error fetching order details:', error);
//                 }
//             }
//         };

//         fetchOrderDetails();
//     }, [orderId]);

//     if (!orderDetails) return <p>Loading...</p>;

//     const total = orderDetails.items.reduce((sum, item) => sum + item.dishId.price * item.quantity, 0);

//     return (
//         <div>
//             <h1>Order Summary</h1>
//             <p>Order ID: {orderDetails._id}</p>
//             <p>Total: ${total.toFixed(2)}</p>
//             <p>Items:</p>
//             <ul>
//                 {orderDetails.items.map(item => (
//                     <li key={item._id}>
//                         {item.dishId.name} - ${item.dishId.price.toFixed(2)} x {item.quantity}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderSummaryPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderSummaryPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!orderDetails) return <p>No order details found.</p>;

    const total = orderDetails.items.reduce((sum, item) => sum + item.dishPrice * item.quantity, 0);

    return (
        <div>
            <h1>Order Summary</h1>
            <p>Order ID: {orderDetails._id}</p>
            <p>Pickup Time: {new Date(orderDetails.pickupTime).toLocaleString()}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <p>Items:</p>
            <ul>
                {orderDetails.items.map((item, index) => (
                    <li key={`${item.dishId}-${index}`}>
                        {item.dishName} - ${item.dishPrice.toFixed(2)} x {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderSummaryPage;
