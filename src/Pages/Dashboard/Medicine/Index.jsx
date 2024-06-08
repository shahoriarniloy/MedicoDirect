import { useState, useEffect } from 'react';
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
import UseCart from '../../../Hooks/UseCart';
import { Helmet } from "react-helmet";


Modal.setAppElement('#root');

const MedicinesIndex = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure(); 
  const [,  refetch]= UseCart(); 

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axiosSecure.get('/medicines');
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

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

  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (medicine) => {
    if (user && user.email) {
      const {
        itemName,itemGenericName,shortDescription, category,company,massUnit,perUnitPrice,discountPercentage,sellerEmail,sellerName,image,price, _id
      } = medicine;

      const cartItem = {
        menuId: _id,
        email: user.email,
        itemName,itemGenericName,shortDescription, category,company,massUnit,perUnitPrice,discountPercentage,sellerEmail,sellerName,image,price
      };

      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data);
          if (res.data && res.data.result1.insertedId) {
            toast.success('Added to Cart');
            refetch();
          } else {
            toast.error('Failed to add to cart');
          }
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
          toast.error('Failed to add to cart');
        });
    } else {
      Swal.fire({
        title: "Log In First",
        text: "You must be logged in to shop from us. Do you want to log in now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log In"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="container mx-auto p-4 roboto-regular">
      <Helmet><title>Medicines</title></Helmet>
      <h2 className="text-2xl font-bold mb-4 mt-16 text-center text-blue-600">Medicines List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Image</th>
            <th className="px-4 py-2 border-b"> Name</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id} className="text-center">
              <td className="px-4 py-2 border-b">{medicine.itemName}</td>
              <td className="px-4 py-2 border-b"><img src={medicine.image} style={{ height: '200px' ,width:'auto'}} alt="" /></td>
              <td className="px-4 py-2 border-b">{medicine.itemGenericName}</td>
              <td className="px-4 py-2 border-b">{medicine.category}</td>
              <td className="px-4 py-2 border-b">
                <button onClick={() => openModal(medicine._id)} className="text-blue-500 hover:text-blue-700 mx-2">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button 
                  onClick={() => handleAddToCart(medicine)}
                  className="text-green-500 hover:text-green-700 mx-2"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
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
            <img src={selectedMedicine.image} alt={selectedMedicine.itemName} style={{ height: '100px', width: 'auto' }} className="w-full h-auto mb-4" />
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

export default MedicinesIndex;
