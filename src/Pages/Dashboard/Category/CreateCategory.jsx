import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../App.css'
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigation } from 'react-router-dom';

const CreateCategory = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const axiosSecure =useAxiosSecure();

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
      await axiosSecure.post('/categories', { name: categoryName, imageUrl: imageUrl });
      Swal.fire("Category created successfully");
      toast.success('Category created successfully');
      
      setCategoryName('');
      setImageUrl('');
      onClose(); 
    } catch (error) {
      console.error('There was an error creating the category!', error);
    }
  };

  return (
    <Modal
      className="fixed inset-0 flex items-center justify-center z-50"
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false} 
    >
      <div className="relative bg-white border-2 border-blue-500 rounded-lg max-w-xl w-full p-8 mx-auto">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Add Category</h2>
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
      </div>
    </Modal>
  );
};

export default CreateCategory;
