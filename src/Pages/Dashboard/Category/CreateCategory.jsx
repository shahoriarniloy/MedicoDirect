import { useState } from 'react';
import axios from 'axios';
import '../../../App.css'

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/categories', { name: categoryName });
      alert('Category created successfully');
      setCategoryName('');
    } catch (error) {
      console.error('There was an error creating the category!', error);
    }
  };

  return (
    <div className="max-w-1/2 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 mt-16 text-center text-3xl">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            value={categoryName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
