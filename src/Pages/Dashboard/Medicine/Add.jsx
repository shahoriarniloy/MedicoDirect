import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import UseAuth from '../../../Hooks/UseAuth';
import Modal from 'react-modal';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MedicineForm = ({ isOpen, onClose }) => {
  const { user } = UseAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.imageUpload[0]);

      const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
      const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

      const imageRes = await axios.post(image_hosting_api, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = imageRes.data.data.url;

      data.sellerEmail = user.email;
      data.sellerName = user.displayName;
      data.image = imageUrl;

      await axiosSecure.post('/medicines', data);
      toast.success('Medicine information added successfully');
      reset();
      onClose();  
    } catch (error) {
      toast.error('There was an error adding the medicine information!');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 roboto-regular text-sm"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <form className="w-1/2 mx-auto p-4 h-screen bg-white rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <button className="m-4 text-lg text-red-500 float-right" onClick={onClose}>Close</button>

        <h2 className="text-3xl text-green-600 font-bold text-center mb-12 mt-16">Add Medicine Information</h2>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className='grid grid-cols-2'>
            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Item Name</label>
              <input
                type="text"
                {...register('itemName', { required: 'Item Name is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.itemName && <p className="text-red-500">{errors.itemName.message}</p>}
            </div>

            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Item Generic Name</label>
              <input
                type="text"
                {...register('itemGenericName', { required: 'Item Generic Name is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.itemGenericName && <p className="text-red-500">{errors.itemGenericName.message}</p>}
            </div>
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block text-gray-700">Short Description</label>
            <textarea
              {...register('shortDescription', { required: 'Short Description is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
            {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}
          </div>

          <div className='grid grid-cols-2'>
            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Image Upload</label>
              <input
                type="file"
                {...register('imageUpload', { required: 'Image Upload is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.imageUpload && <p className="text-red-500">{errors.imageUpload.message}</p>}
            </div>

            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Category</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option disabled value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-2'>
            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Company</label>
              <input
                type="text"
                {...register('company', { required: 'Company is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.company && <p className="text-red-500">{errors.company.message}</p>}
            </div>

            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Item Mass Unit (Mg or ML)</label>
              <select
                {...register('massUnit', { required: 'Mass Unit is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option disabled value="">Select Mass Unit</option>
                <option value="mg">Mg</option>
                <option value="ml">ML</option>
              </select>
              {errors.massUnit && <p className="text-red-500">{errors.massUnit.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-2'>
            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Per Unit Price</label>
              <input
                type="number"
                {...register('perUnitPrice', { required: 'Per Unit Price is required' })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.perUnitPrice && <p className="text-red-500">{errors.perUnitPrice.message}</p>}
            </div>

            <div className="w-full px-3 mb-2">
              <label className="block text-gray-700">Discount Percentage (Default: 0)</label>
              <input
                type="number"
                {...register('discountPercentage')}
                defaultValue={0}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.discountPercentage && <p className="text-red-500">{errors.discountPercentage.message}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-green-600"
        >
          Add Medicine
        </button>
      </form>
    </Modal>
  );
};

export default MedicineForm;
