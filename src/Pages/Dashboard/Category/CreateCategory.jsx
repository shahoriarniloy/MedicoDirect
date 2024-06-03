import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../App.css'

const CreateCategory = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setCategoryName(value);
    } else if (name === 'imageUrl') {
      setImageUrl(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/categories', { name: categoryName, imageUrl: imageUrl });
      toast.success('Category created successfully');
      setCategoryName('');
      setImageUrl('');
      onClose(); 
    } catch (error) {
      console.error('There was an error creating the category!', error);
    }
  };

  return (
    <Modal className=" roboto-regular" isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button className="absolute top-0 right-0 m-2" onClick={onClose}><AiOutlineClose /></button>
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 roboto-regular text-blue-600 text-center text-3xl">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              value={categoryName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
    </Modal>
  );
};

export default CreateCategory;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid blue',
    borderRadius: '8px',
    maxWidth: '800px'
  }
};
