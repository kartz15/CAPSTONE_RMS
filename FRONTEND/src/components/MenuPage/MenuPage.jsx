// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MenuPage.css';

// const MenuPage = () => {
//     const [dishes, setDishes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dishes');
//                 setDishes(response.data);
//             } catch (err) {
//                 console.error('Error fetching dishes:', err);
//                 setError('Failed to load dishes');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error);
//                 setError('Failed to load categories');
//             }
//         };

//         const fetchData = async () => {
//             await Promise.all([fetchDishes(), fetchCategories()]);
//             setLoading(false); // Set loading to false after both requests complete
//         };

//         fetchData();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const filteredDishes = selectedCategory
//         ? dishes.filter(dish => dish.category === selectedCategory)
//         : dishes;

//     if (loading) return <h2 className="loading">Loading...</h2>;
//     if (error) return <h2 className="error">{error}</h2>;

//     return (
//         <div className="menu-container">
//             <h1 className="menu-title">Menu</h1>
//             <div className="category-container">
//                 <h2>Select a Category:</h2>
//                 <div className="category-grid">
//                     {categories.map((category) => (
//                         <div 
//                             key={category._id} 
//                             className="category-card" 
//                             onClick={() => handleCategorySelect(category._id)}
//                             style={{ backgroundImage: `url(${category.image})` }} // Assuming category has an image field
//                         >
//                             <div className="category-name">{category.name}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="dish-grid">
//                 {filteredDishes.map((dish) => (
//                     <DishCard key={dish._id} dish={dish} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const DishCard = ({ dish }) => {
//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p>{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//         </div>
//     );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useCart } from '../CartContext/CartContext'; // Adjust the path to your CartContext
// import './MenuPage.css';

// const MenuPage = () => {
//     const [dishes, setDishes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const { addToCart } = useCart(); // Use the addToCart function

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dishes');
//                 setDishes(response.data);
//             } catch (err) {
//                 console.error('Error fetching dishes:', err);
//                 setError('Failed to load dishes');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error);
//                 setError('Failed to load categories');
//             }
//         };

//         const fetchData = async () => {
//             await Promise.all([fetchDishes(), fetchCategories()]);
//             setLoading(false);
//         };

//         fetchData();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const filteredDishes = selectedCategory
//         ? dishes.filter(dish => dish.category === selectedCategory)
//         : dishes;

//     if (loading) return <h2 className="loading">Loading...</h2>;
//     if (error) return <h2 className="error">{error}</h2>;

//     return (
//         <div className="menu-container">
//             <h1 className="menu-title">Menu</h1>
//             <div className="category-container">
//                 <h2>Select a Category:</h2>
//                 <div className="category-grid">
//                     {categories.map((category) => (
//                         <div 
//                             key={category._id} 
//                             className="category-card" 
//                             onClick={() => handleCategorySelect(category._id)}
//                             style={{ backgroundImage: `url(${category.image})` }}
//                         >
//                             <div className="category-name">{category.name}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="dish-grid">
//                 {filteredDishes.map((dish) => (
//                     <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const DishCard = ({ dish, addToCart }) => {
//     const handleAddToCart = () => {
//         addToCart(dish);
//         alert(`${dish.name} has been added to your cart!`);
//     };

//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p>{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//             <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MenuPage.css';

// const MenuPage = ({ addToCart }) => {
//     const [dishes, setDishes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dishes');
//                 setDishes(response.data);
//             } catch (err) {
//                 console.error('Error fetching dishes:', err);
//                 setError('Failed to load dishes');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error);
//                 setError('Failed to load categories');
//             }
//         };

//         const fetchData = async () => {
//             await Promise.all([fetchDishes(), fetchCategories()]);
//             setLoading(false);
//         };

//         fetchData();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const filteredDishes = selectedCategory
//         ? dishes.filter(dish => dish.category === selectedCategory)
//         : dishes;

//     if (loading) return <h2 className="loading">Loading...</h2>;
//     if (error) return <h2 className="error">{error}</h2>;

//     return (
//         <div className="menu-container">
//             <h1 className="menu-title">Menu</h1>
//             <div className="category-container">
//                 <h2>Select a Category:</h2>
//                 <div className="category-grid">
//                     {categories.map((category) => (
//                         <div 
//                             key={category._id} 
//                             className="category-card" 
//                             onClick={() => handleCategorySelect(category._id)}
//                         >
//                             <div className="category-name">{category.name}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="dish-grid">
//                 {filteredDishes.map((dish) => (
//                     <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const DishCard = ({ dish, addToCart }) => {
//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p>{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//             <button onClick={() => addToCart(dish)}>Add to Cart</button> {/* Add to Cart button */}
//         </div>
//     );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MenuPage.css';

// const MenuPage = ({ addToCart }) => {
//     const [dishes, setDishes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dishes');
//                 setDishes(response.data);
//             } catch (err) {
//                 console.error('Error fetching dishes:', err);
//                 setError('Failed to load dishes');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error);
//                 setError('Failed to load categories');
//             }
//         };

//         const fetchData = async () => {
//             await Promise.all([fetchDishes(), fetchCategories()]);
//             setLoading(false);
//         };

//         fetchData();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const filteredDishes = selectedCategory
//         ? dishes.filter(dish => dish.category === selectedCategory)
//         : dishes;

//     const handleAddToCart = (dish) => {
//         addToCart(dish);
//         alert(`${dish.name} has been added to your cart!`); // Simple alert message
//     };

//     if (loading) return <h2 className="loading">Loading...</h2>;
//     if (error) return <h2 className="error">{error}</h2>;

//     return (
//         <div className="menu-container">
//             <h1 className="menu-title">Menu</h1>
//             <div className="category-container">
//                 <h2>Select a Category:</h2>
//                 <div className="category-grid">
//                     {categories.map((category) => (
//                         <div 
//                             key={category._id} 
//                             className="category-card" 
//                             onClick={() => handleCategorySelect(category._id)}
//                         >
//                             <div className="category-name">{category.name}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="dish-grid">
//                 {filteredDishes.map((dish) => (
//                     <DishCard key={dish._id} dish={dish} addToCart={handleAddToCart} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const DishCard = ({ dish, addToCart }) => {
//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p>{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//             <button onClick={() => addToCart(dish)}>Add to Cart</button>
//         </div>
//     );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MenuPage.css';

// const MenuPage = ({ addToCart }) => {
//     const [dishes, setDishes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dishes');
//                 setDishes(response.data);
//             } catch (err) {
//                 console.error('Error fetching dishes:', err);
//                 setError('Failed to load dishes');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error);
//                 setError('Failed to load categories');
//             }
//         };

//         const fetchData = async () => {
//             await Promise.all([fetchDishes(), fetchCategories()]);
//             setLoading(false);
//         };

//         fetchData();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const filteredDishes = selectedCategory
//         ? dishes.filter(dish => dish.category === selectedCategory)
//         : dishes;

//     if (loading) return <h2 className="loading">Loading...</h2>;
//     if (error) return <h2 className="error">{error}</h2>;

//     return (
//         <div className="menu-container">
//             <h1 className="menu-title">Menu</h1>
//             <div className="category-container">
//                 <h2>Select a Category:</h2>
//                 <div className="category-grid">
//                     {categories.map((category) => (
//                         <div 
//                             key={category._id} 
//                             className="category-card" 
//                             onClick={() => handleCategorySelect(category._id)}
//                         >
//                             <div className="category-name">{category.name}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="dish-grid">
//                 {filteredDishes.map((dish) => (
//                     <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const DishCard = ({ dish, addToCart }) => {
//     const [quantity, setQuantity] = useState(1); // State for quantity

//     const handleAddToCart = () => {
//         if (quantity <= 0) {
//             alert("Please enter a valid quantity.");
//             return;
//         }
//         const itemToAdd = { ...dish, quantity }; // Add quantity to dish object
//         addToCart(itemToAdd);
//         alert(`${dish.name} has been added to your cart! Quantity: ${quantity}`);
//         setQuantity(1); // Reset quantity after adding to cart
//     };

//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p>{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//             <input 
//                 type="number" 
//                 value={quantity} 
//                 min="1" 
//                 onChange={(e) => setQuantity(e.target.value)} 
//             />
//             <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MenuPage.css';

// const MenuPage = ({ addToCart }) => {
//     const [dishes, setDishes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dishes');
//                 setDishes(response.data);
//             } catch (err) {
//                 console.error('Error fetching dishes:', err);
//                 setError('Failed to load dishes');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error);
//                 setError('Failed to load categories');
//             }
//         };

//         const fetchData = async () => {
//             await Promise.all([fetchDishes(), fetchCategories()]);
//             setLoading(false);
//         };

//         fetchData();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const filteredDishes = selectedCategory
//         ? dishes.filter(dish => dish.category === selectedCategory)
//         : dishes;

//     if (loading) return <h2 className="loading">Loading...</h2>;
//     if (error) return <h2 className="error">{error}</h2>;

//     return (
//         <div className="menu-container">
//             <h1 className="menu-title">Menu</h1>
//             <div className="category-container">
//                 {/* <h2>Select a Category:</h2> */}
//                 <div className="category-grid">
//                         {categories.map((category) => (
//                             <div 
//                                 key={category._id} 
//                                 className="category-card" 
//                                 onClick={() => handleCategorySelect(category._id)}
//                             >
//                                 <div className="category-name">{category.name}</div>
//                                 <div 
//                                     className="category-image" 
//                                     style={{ backgroundImage: `url(${category.image})` }}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//             </div>
//             <div className="dish-grid">
//                 {filteredDishes.map((dish) => (
//                     <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const DishCard = ({ dish, addToCart }) => {
//     const [quantity, setQuantity] = useState(1); // State for quantity

//     const handleAddToCart = () => {
//         if (quantity <= 0) {
//             alert("Please enter a valid quantity.");
//             return;
//         }
//         const itemToAdd = { ...dish, quantity }; // Add quantity to dish object
//         addToCart(itemToAdd);
//         alert(`${dish.name} has been added to your cart! Quantity: ${quantity}`);
//         setQuantity(1); // Reset quantity after adding to cart
//     };

//     return (
//         <div className="dish-card">
//             <h3>{dish.name}</h3>
//             <p>{dish.description}</p>
//             <p>${dish.price.toFixed(2)}</p>
//             {dish.image && <img src={dish.image} alt={dish.name} />}
//             <input 
//                 type="number" 
//                 value={quantity} 
//                 min="1" 
//                 onChange={(e) => setQuantity(e.target.value)} 
//             />
//             <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };

// export default MenuPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuPage.css';

const MenuPage = ({ addToCart }) => {
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dishes');
                setDishes(response.data);
            } catch (err) {
                console.error('Error fetching dishes:', err);
                setError('Failed to load dishes');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setError('Failed to load categories');
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchDishes(), fetchCategories()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleResetMenu = () => {
        setSelectedCategory('');
    };

    const filteredDishes = selectedCategory
        ? dishes.filter(dish => dish.category === selectedCategory)
        : dishes;

    if (loading) return <h2 className="loading">Loading...</h2>;
    if (error) return <h2 className="error">{error}</h2>;

    return (
        <div className="menu-container">
            <h1 
                className="menu-title" 
                onClick={handleResetMenu} 
                style={{ cursor: 'pointer' }} // Adding pointer cursor for better UX
            >
                Menu
            </h1>
            <div className="category-container">
                <div className="category-grid">
                    {categories.map((category) => (
                        <div 
                            key={category._id} 
                            className="category-card" 
                            onClick={() => handleCategorySelect(category._id)}
                        >
                            <div className="category-name">{category.name}</div>
                            <div 
                                className="category-image" 
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="dish-grid">
                {filteredDishes.map((dish) => (
                    <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

const DishCard = ({ dish, addToCart }) => {
    const [quantity, setQuantity] = useState(1); // State for quantity

    const handleAddToCart = () => {
        if (quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }
        const itemToAdd = { ...dish, quantity }; // Add quantity to dish object
        addToCart(itemToAdd);
        alert(`${dish.name} has been added to your cart! Quantity: ${quantity}`);
        setQuantity(1); // Reset quantity after adding to cart
    };

    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>${dish.price.toFixed(2)}</p>
            {dish.image && <img src={dish.image} alt={dish.name} />}
            <input 
                type="number" 
                value={quantity} 
                min="1" 
                onChange={(e) => setQuantity(e.target.value)} 
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default MenuPage;
