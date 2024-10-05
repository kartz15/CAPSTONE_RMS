import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import AddCategory from '../CreateCategory/CreateCategory';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryAdded = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category', category);

        try {
            const response = await axios.post('http://localhost:5000/api/dishes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Dish added successfully!');
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setCategory('');

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
            <AddCategory onCategoryAdded={handleCategoryAdded} />
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
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Dish</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default AdminPage;
