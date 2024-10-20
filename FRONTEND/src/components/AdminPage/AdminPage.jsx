import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import AddCategory from '../CreateCategory/CreateCategory';
import DishModal from './DishModal/DishModal';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [editingDishId, setEditingDishId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/api/categories');
                const response = await axios.get(' https://capstone-rms.onrender.com/api/categories');
               
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchDishes = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/api/dishes');
                const response = await axios.get(' https://capstone-rms.onrender.com/api/dishes');     
                // const response = await axios.get(`http://localhost:5000/api/dishes${category ? `?category=${category}` : ''}`);
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
        setCategory(dish.category);
        setImage(dish.image);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this dish?');
        if (confirmDelete) {
            try {
                // await axios.delete(`http://localhost:5000/api/dishes/${id}`);
                await axios.delete(` https://capstone-rms.onrender.com/api/dishes/${id}`);
               
                setDishes((prevDishes) => prevDishes.filter(dish => dish._id !== id));
                showSuccessMessage('Dish deleted successfully!');
  

            } catch (error) {
                console.error('Error deleting dish:', error);
                setSuccessMessage('Error deleting dish. Please try again.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image && !editingDishId) { 
            showSuccessMessage('Please select an image for the dish.');
            return;
        }
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
                // const response = await axios.put(`http://localhost:5000/api/dishes/${editingDishId}`, formData);
                const response = await axios.put(`  https://capstone-rms.onrender.com/api/dishes/${editingDishId}`, formData);
              
                const updatedDish = response.data;
                setDishes((prevDishes) =>
                    prevDishes.map((dish) => (dish._id === editingDishId ? updatedDish : dish))
                );
                alert('Dish updated successfully!');
            } else {
                // const response = await axios.post('http://localhost:5000/api/dishes', formData);
                const response = await axios.post(' https://capstone-rms.onrender.com/api/dishes', formData);
               
                const newDish = response.data;
                setDishes((prevDishes) => [...prevDishes, newDish]);
                alert('Dish added successfully!');
                
            }
            resetForm();


        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error);
            setSuccessMessage('Error. Please try again.');
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
        setCategory('');
        setEditingDishId(null);
        setIsModalOpen(false);

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
    };


    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };
    
    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    return (
        <div className="admin-container">
            <div className="form-container">
                <h2>Add or Edit Dishes</h2>
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
            <div className="dish-list-container">
                <h2>Current Dishes</h2>
                <input
                    type="text"
                    placeholder="Search Dishes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
                <div className="dish-list">
                    {filteredDishes.map((dish) => (
                        <div key={dish._id} className="dish-card">
                            <h3>{dish.name}</h3>
                            <p>{dish.description}</p>
                            <p>${dish.price}</p>
                            {dish.image && <img src={dish.image} alt={dish.name} style={{ width: '100px', height: '100px' }} />}
                            <div className='button_dish'> 
                                <button onClick={() => handleEditClick(dish)}>Edit</button>
                                <button onClick={() => handleDeleteClick(dish._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <DishModal 
                    isOpen={isModalOpen}
                    onClose={resetForm}
                    onSubmit={handleSubmit}
                    dish={{ name, description, price, category }}
                    setDish={{
                        setName,
                        setDescription,
                        setPrice,
                        setImage,
                        setCategory
                    }}
                    categories={categories} 
                />
            )}
        </div>
    );
};

export default AdminPage;
