import React, { useState } from 'react';
import axios from 'axios';
 import './CreateCategory.css'

const AddCategory = ({ onCategoryAdded }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/categories', formData);
            alert('Category added successfully');
            onCategoryAdded(response.data); // Call the callback to update categories
            setName('');
            setImage(null);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Category Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                required 
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default AddCategory;
