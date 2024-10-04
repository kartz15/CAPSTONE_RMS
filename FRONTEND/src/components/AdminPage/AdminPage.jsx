import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category', category);

        try {
            const response = await axios.post('http://localhost:5000/api/dishes/dishes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Dish added successfully!');
            // Clear form fields
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setCategory('');

            // Clear message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error creating dish:', error.response.data);
            setSuccessMessage('Error adding dish. Please try again.');
        }
    };

    return (
        <div className="admin-container">
            <h2>Add a New Dish</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Dish Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    required 
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                </select>
                <button type="submit">Add Dish</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default AdminPage;
