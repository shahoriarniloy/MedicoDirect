import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import CreateCategory from './CreateCategory';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const CategoryIndex = () => {
    const axiosSecure = useAxiosSecure();

    const { data: categories = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get('/categories');
                return response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
                return [];
            }
        }
    });

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/categories/${id}`);
            refetch();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=' '>
            <Helmet>
                <title>Categories</title>
            </Helmet>
            <h2 className='text-3xl text-center roboto-regular text-green-600'>Category Index</h2>
            <button type="button" className='bg-green-500 px-8 mb-4 float-right mr-8 py-2 rounded-xl text-white text-center' onClick={openModal}><FaPlus /></button>
            <table className="w-full text-left">
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
