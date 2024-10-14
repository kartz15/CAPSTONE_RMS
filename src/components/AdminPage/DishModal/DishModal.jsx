import React from 'react';
import './DishModal.css';

const DishModal = ({ isOpen, onClose, onSubmit, dish, setDish, categories }) => {
    if (!isOpen) return null;


    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setDish.setName(value);
                break;
            case 'description':
                setDish.setDescription(value);
                break;
            case 'price':
                setDish.setPrice(value);
                break;
            case 'category':
                setDish.setCategory(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = (e) => {
        setDish.setImage(e.target.files[0]);
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Dish</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Dish Name"
                        value={dish.name}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={dish.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={dish.price}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="category"
                        value={dish.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {/* {dish.image && (
                        <div>
                            <p>Current Image:</p>
                            <img src={URL.createObjectURL(dish.image)} alt={dish.name} style={{ width: '100px', height: '100px' }} />
                        </div>
                    )}  */}
                    {dish.image && (
                    <div>
                        <p>Current Image:</p>
                        <img 
                            src={typeof dish.image === 'string' ? dish.image : URL.createObjectURL(dish.image)} 
                            alt={dish.name} 
                            style={{ width: '100px', height: '100px' }} 
                        />
                    </div>
                )}

                    {/* {dish.image && (
                    <div>
                        <p>Current Image:</p>
                        {typeof dish.image === 'string' ? (
                            <img src={dish.image} alt={dish.name} style={{ width: '100px', height: '100px' }} />
                        ) : (
                            <img src={URL.createObjectURL(dish.image)} alt={dish.name} style={{ width: '100px', height: '100px' }} />
                        )} 
                    </div> 
                )}*/}

                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                    <button type="submit">Update Dish</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DishModal;
