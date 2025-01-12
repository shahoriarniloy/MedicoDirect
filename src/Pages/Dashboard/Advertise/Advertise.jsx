import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-modal';
import '../../../App.css';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';  
import { useQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

Modal.setAppElement('#root');

const Advertise = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {user}= UseAuth();

  const axiosSecure = useAxiosSecure();
  const { data: meds = [], refetch } = useQuery({
    queryKey: ['meds'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/seller/medicines/${user.email}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching medicines:', error);
        return []; 
      }
    }
  });

  const openModal = async (medicineId) => {
    try {
      const response = await axiosSecure.get(`/medicines/${medicineId}`);

      setSelectedMedicine(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching medicine details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const handleRequestAdvertisement = async (med) => {
    try {
        await axiosSecure.put(`/medicine-advertise-status/${med._id}`);

      await axiosSecure.post(`/advertisement`, {
        medicineId: med._id,
        itemName: med.itemName,
        category:med.category,
        description:med.description,
        company:med.company,
        userEmail: user.email,
      });
      toast.success('Advertisement Requested');
    } catch (error) {
      console.error('Error requesting advertisement:', error);
      toast.error('Failed to request advertisement. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4 roboto-regular">
      <h2 className="text-2xl font-bold mb-4 mt-16 text-center text-green-600">Medicines List</h2>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Image</th>
            <th className="px-4 py-2 border-b"> Company</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meds.medicines && meds.medicines.map((med) => (
            <tr key={med._id} className="text-center">
              <td className="px-4 py-2 border-b">{med.itemName}</td>
              <td className="h-48 w-auto px-4 py-2 border-b">
                <img src={med.image} alt="" style={{ height: '100px' }} />
              </td>
              <td className="px-4 py-2 border-b">{med.company}</td>
              <td className="px-4 py-2 border-b">{med.category}</td>
              <td className="px-4 py-2 border-b">
                <button onClick={() => openModal(med._id)} className="text-green-500 hover:text-green-700 mx-2">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleRequestAdvertisement(med)} className="text-green-500 hover:text-green-700 mx-2">
                  Request Advertisement
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Medicine Details"
        className="modal bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto mt-20 relative"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        {selectedMedicine && (
          <div className='roboto-regular'>
            <h2 className="text-2xl font-bold mb-4">{selectedMedicine.itemName}</h2>
            <img src={selectedMedicine.image} alt={selectedMedicine.itemName}  style={{ height: '100px', width: 'auto' }} className="w-full h-auto mb-4" />
            <p><strong>Item Generic Name:</strong> {selectedMedicine.itemGenericName}</p>
            <p><strong>Short Description:</strong> {selectedMedicine.shortDescription}</p>
            <p><strong>Category:</strong> {selectedMedicine.category}</p>
            <p><strong>Company:</strong> {selectedMedicine.company}</p>
            <p><strong>Mass Unit:</strong> {selectedMedicine.massUnit}</p>
            <p><strong>Per Unit Price:</strong> {selectedMedicine.perUnitPrice}</p>
            <p><strong>Discount Percentage:</strong> {selectedMedicine.discountPercentage}</p>
            <p><strong>Seller Email:</strong> {selectedMedicine.sellerEmail}</p>
            <p><strong>Seller Name:</strong> {selectedMedicine.sellerName}</p>
            <p><strong>Price:</strong> {selectedMedicine.price}</p>

            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Advertise;
