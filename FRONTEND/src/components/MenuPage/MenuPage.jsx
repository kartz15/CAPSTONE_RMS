// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import DishCard from '../DishCard/DishCard';
// // // import './MenuPage.css'

// // // const MenuPage = () => {
// // //     const [dishes, setDishes] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState('');

// // //     useEffect(() => {
// // //         const fetchDishes = async () => {
// // //             try {
// // //                 const response = await axios.get('http://localhost:5000/api/dishes');
// // //                 setDishes(response.data);
// // //                 setLoading(false);
// // //             } catch (err) {
// // //                 setError('Failed to load dishes');
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchDishes();
// // //     }, []);

// // //     if (loading) return <h2 className="loading">Loading...</h2>;
// // //     if (error) return <h2 className="error">{error}</h2>;

// // //     return (
// // //         <div className="menu-container">
// // //              <h1 className="menu-title">Menu</h1>
// // //              <div className="dish-grid">
// // //                 {dishes.map((dish) => (
// // //                     <DishCard key={dish._id} dish={dish} />
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default MenuPage;

// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import './MenuPage.css';

// // // const MenuPage = () => {
// // //     const [dishes, setDishes] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState('');

// // //     useEffect(() => {
// // //         const fetchDishes = async () => {
// // //             try {
// // //                 const response = await axios.get('http://localhost:5000/api/dishes');
// // //                 setDishes(response.data);
// // //             } catch (err) {
// // //                 console.error('Error fetching dishes:', err); // Log detailed error
// // //                 setError('Failed to load dishes');
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchDishes();
// // //     }, []);

// // //     if (loading) return <h2 className="loading">Loading...</h2>;
// // //     if (error) return <h2 className="error">{error}</h2>;

// // //     return (
// // //         <div className="menu-container">
// // //             <h1 className="menu-title">Menu</h1>
// // //             <div className="dish-grid">
// // //                 {dishes.map((dish) => (
// // //                     <DishCard key={dish._id} dish={dish} />
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // const DishCard = ({ dish }) => {
// // //     return (
// // //         <div className="dish-card">
// // //             <h3>{dish.name}</h3>
// // //             <p>{dish.description}</p>
// // //             <p>${dish.price.toFixed(2)}</p>
// // //             {dish.image && <img src={dish.image} alt={dish.name} />}
// // //         </div>
// // //     );
// // // };

// // // export default MenuPage;

// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import './MenuPage.css';

// // // const MenuPage = () => {
// // //     const [dishes, setDishes] = useState([]);
// // //     const [categories, setCategories] = useState([]);
// // //     const [selectedCategory, setSelectedCategory] = useState('');
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState('');

// // //     useEffect(() => {
// // //         const fetchDishes = async () => {
// // //             try {
// // //                 const response = await axios.get('http://localhost:5000/api/dishes');
// // //                 setDishes(response.data);
// // //                 // Extract unique categories
// // //                 const uniqueCategories = [...new Set(response.data.map(dish => dish.category))];
// // //                 setCategories(uniqueCategories);
// // //             } catch (err) {
// // //                 console.error('Error fetching dishes:', err);
// // //                 setError('Failed to load dishes');
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchDishes();
// // //     }, []);

// // //     const handleCategorySelect = (category) => {
// // //         setSelectedCategory(category);
// // //     };

// // //     const filteredDishes = selectedCategory
// // //         ? dishes.filter(dish => dish.category === selectedCategory)
// // //         : dishes;

// // //     if (loading) return <h2 className="loading">Loading...</h2>;
// // //     if (error) return <h2 className="error">{error}</h2>;

// // //     return (
// // //         <div className="menu-container">
// // //             <h1 className="menu-title">Menu</h1>
// // //             <div className="category-container">
// // //                 <h2>Select a Category:</h2>
// // //                 {categories.map((category) => (
// // //                     <button key={category} onClick={() => handleCategorySelect(category)}>
// // //                         {category}
// // //                     </button>
// // //                 ))}
// // //             </div>
// // //             <div className="dish-grid">
// // //                 {filteredDishes.map((dish) => (
// // //                     <DishCard key={dish._id} dish={dish} />
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // const DishCard = ({ dish }) => {
// // //     return (
// // //         <div className="dish-card">
// // //             <h3>{dish.name}</h3>
// // //             <p>{dish.description}</p>
// // //             <p>${dish.price.toFixed(2)}</p>
// // //             {dish.image && <img src={dish.image} alt={dish.name} />}
// // //         </div>
// // //     );
// // // };

// // // export default MenuPage;

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './MenuPage.css';

// // const MenuPage = () => {
// //     const [dishes, setDishes] = useState([]);
// //     const [categories, setCategories] = useState([]);
// //     const [selectedCategory, setSelectedCategory] = useState('');
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchDishes = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:5000/api/dishes');
// //                 setDishes(response.data);
// //                 const uniqueCategories = [...new Set(response.data.map(dish => dish.category))];
// //                 setCategories(uniqueCategories);
// //             } catch (err) {
// //                 console.error('Error fetching dishes:', err);
// //                 setError('Failed to load dishes');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchDishes();
// //     }, []);

// //     useEffect(() => {
// //         const fetchCategories = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:5000/api/categories');
// //                 setCategories(response.data);
// //             } catch (error) {
// //                 console.error('Failed to fetch categories:', error);
// //             }
// //         };
    
// //         fetchCategories();
// //     }, []);

    
// //     const handleCategorySelect = (category) => {
// //         setSelectedCategory(category);
// //     };

// //     const filteredDishes = selectedCategory
// //         ? dishes.filter(dish => dish.category === selectedCategory)
// //         : dishes;

// //     if (loading) return <h2 className="loading">Loading...</h2>;
// //     if (error) return <h2 className="error">{error}</h2>;

// //     return (
// //         <div className="menu-container">
// //             <h1 className="menu-title">Menu</h1>
// //             <div className="category-container">
// //                 <h2>Select a Category:</h2>
// //                 <div className="category-grid">
// //                     {categories.map((category) => (
// //                         <div 
// //                             key={category} 
// //                             className="category-card" 
// //                             onClick={() => handleCategorySelect(category)}
// //                             style={{ backgroundImage: `url(/path/to/${category}.jpg)` }} // Use your image path here
// //                         >
// //                             <div className="category-name">{category}</div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //             <div className="dish-grid">
// //                 {filteredDishes.map((dish) => (
// //                     <DishCard key={dish._id} dish={dish} />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// // const DishCard = ({ dish }) => {
// //     return (
// //         <div className="dish-card">
// //             <h3>{dish.name}</h3>
// //             <p>{dish.description}</p>
// //             <p>${dish.price.toFixed(2)}</p>
// //             {dish.image && <img src={dish.image} alt={dish.name} />}
// //         </div>
// //     );
// // };

// // export default MenuPage;
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

//         fetchDishes();
//         fetchCategories();
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuPage.css';

const MenuPage = () => {
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
            setLoading(false); // Set loading to false after both requests complete
        };

        fetchData();
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const filteredDishes = selectedCategory
        ? dishes.filter(dish => dish.category === selectedCategory)
        : dishes;

    if (loading) return <h2 className="loading">Loading...</h2>;
    if (error) return <h2 className="error">{error}</h2>;

    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <div className="category-container">
                <h2>Select a Category:</h2>
                <div className="category-grid">
                    {categories.map((category) => (
                        <div 
                            key={category._id} 
                            className="category-card" 
                            onClick={() => handleCategorySelect(category._id)}
                            style={{ backgroundImage: `url(${category.image})` }} // Assuming category has an image field
                        >
                            <div className="category-name">{category.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dish-grid">
                {filteredDishes.map((dish) => (
                    <DishCard key={dish._id} dish={dish} />
                ))}
            </div>
        </div>
    );
};

const DishCard = ({ dish }) => {
    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>${dish.price.toFixed(2)}</p>
            {dish.image && <img src={dish.image} alt={dish.name} />}
        </div>
    );
};

export default MenuPage;
