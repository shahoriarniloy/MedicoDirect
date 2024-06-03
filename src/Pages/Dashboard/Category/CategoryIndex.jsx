import  { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import { FaTrash, FaPlus } from 'react-icons/fa';const CategoryIndex = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='pt-16 '>
            <h2 className='text-3xl text-center roboto-regular text-blue-600'>Category Index</h2>
            <button  type="button" className='bg-blue-500 px-8 mb-4 float-right mr-8 py-2 rounded-xl text-white text-center' onClick={openModal}><FaPlus /> </button>            
            <table className="w-full text-left  ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td><img src={category.imageUrl} alt={category.name} style={{ width: '100px', height: '100px' }} /></td>
                            <td>
                                <button className="text-red-500" onClick={() => handleDelete(category._id)}>
                                    <FaTrash />
                                </button>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateCategory isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default CategoryIndex;
