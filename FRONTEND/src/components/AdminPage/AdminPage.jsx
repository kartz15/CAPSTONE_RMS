import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import AddCategory from '../CreateCategory/CreateCategory';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(''); 
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [editingDishId, setEditingDishId] = useState(null);
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

        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dishes');
                setDishes(response.data);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        fetchCategories();
        fetchDishes();
    }, []);

    const handleCategoryAdded = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    const handleEditClick = (dish) => {
        setEditingDishId(dish._id);
        setName(dish.name);
        setDescription(dish.description);
        setPrice(dish.price);
        setCurrentImage(dish.image); // Set current image for display
        setCategory(dish.category);
        setImage(null); // Reset new image input
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this dish?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/dishes/${id}`);
                setDishes((prevDishes) => prevDishes.filter(dish => dish._id !== id));
                setSuccessMessage('Dish deleted successfully!');
            } catch (error) {
                console.error('Error deleting dish:', error.response.data);
                setSuccessMessage('Error deleting dish. Please try again.');
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }
        formData.append('category', category);
    
        try {
            if (editingDishId) {
                const response = await axios.put(`http://localhost:5000/api/dishes/${editingDishId}`, formData);
                const updatedDish = response.data; // Assuming your API returns the updated dish
                
                setDishes((prevDishes) =>
                    prevDishes.map((dish) => (dish._id === editingDishId ? updatedDish : dish))
                );
                alert('Dish updated successfully!');
            } else {
                const response = await axios.post('http://localhost:5000/api/dishes', formData);
                const newDish = response.data; // Assuming your API returns the new dish
                
                setDishes((prevDishes) => [...prevDishes, newDish]);
                alert('Dish added successfully!');
            }
    
            // Reset form
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setCurrentImage('');
            setCategory('');
            setEditingDishId(null);
        } catch (error) {
            console.error('Error:', error.response.data);
            setSuccessMessage('Error. Please try again.');
        }
    };
    
    return (
        <div className="admin-container">
            <div className='top_menus'>
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
                {currentImage && (
                    <div>
                        <img src={currentImage} alt="Current Dish" style={{ width: '100px', height: '100px' }} />
                        <p>Current Image</p>
                    </div>
                )}
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
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
                <button type="submit">{editingDishId ? 'Update Dish' : 'Add Dish'}</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            </div>           
            <div className="dish-list">
                {dishes.map((dish) => (
                    <div key={dish._id} className="dish-card">
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <p>{dish.price}</p>
                        {dish.image && <img src={dish.image} alt={dish.name} style={{ width: '100px', height: '100px' }} />}<br/><br/>
                        <div className='button_dish' > 
                        <button onClick={() => handleEditClick(dish)}>Edit</button>
                        <button onClick={() => handleDeleteClick(dish._id)}>Delete</button> {/* Delete button */} </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
