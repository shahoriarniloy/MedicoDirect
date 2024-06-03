import  { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const MedicinesIndex = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/medicines');
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  const openModal = async (medicineId) => {
    try {
      const response = await axios.get(`http://localhost:5000/medicines/${medicineId}`);
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Medicines List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Brand Name</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id} className="text-center">
              <td className="px-4 py-2 border-b">{medicine.productName}</td>
              <td className="px-4 py-2 border-b">{medicine.brandName}</td>
              <td className="px-4 py-2 border-b">{medicine.category}</td>
              <td className="px-4 py-2 border-b">
                <button onClick={() => openModal(medicine._id)} className="text-blue-500 hover:text-blue-700 mx-2">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="text-green-500 hover:text-green-700 mx-2">
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
        className="modal bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20 relative"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        {selectedMedicine && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedMedicine.productName}</h2>
            <img src={selectedMedicine.imageUrl} alt={selectedMedicine.productName} className="w-full h-auto mb-4" />
            <p><strong>Brand Name:</strong> {selectedMedicine.brandName}</p>
            <p><strong>Generic Name:</strong> {selectedMedicine.genericName}</p>
            <p><strong>Dosage Form:</strong> {selectedMedicine.dosageForm}</p>
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MedicinesIndex;
