import { useState, useEffect } from 'react';
import '../../App.css'

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className='roboto-regular'>
        <h1 className='text-center text-4xl text-blue-700 mt-12'>Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {categories.map(category => (
          <div key={category._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-[200px] object-cover" src={category.imageUrl} alt={category.name} />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
