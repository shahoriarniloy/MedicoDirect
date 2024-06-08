import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSort, faTimes } from '@fortawesome/free-solid-svg-icons';
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
import { TailSpin } from 'react-loader-spinner';
import Add from './Add';
import { Helmet } from "react-helmet";


Modal.setAppElement('#root');

const SellerIndex = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meds = [], refetch, isLoading } = useQuery({
    queryKey: ['meds'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/seller/medicines/${user.email}`);
        return res.data.medicines;
      } catch (error) {
        console.error('Error fetching medicines:', error);
        return [];
      }
    },
    initialData: [] 
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

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (medicine) => {
    if (user && user.email) {
      const {
        productName, brandName, genericName, strength, packaging, price, image, manufacturer,
        expirationDate, description, indications, dosageInstructions, sideEffects, warnings,
        contraindications, storageInstructions, ingredients, category, _id
      } = medicine;

      const cartItem = {
        menuId: _id,
        email: user.email,
        productName, brandName, genericName, strength, packaging, price, image, manufacturer,
        expirationDate, description, indications, dosageInstructions, sideEffects, warnings,
        contraindications, storageInstructions, ingredients, category
      };

      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data && res.data.insertedId) {
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

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const sortedMeds = useMemo(() => {
    return meds.slice().sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [meds, sortDirection]);

  const filteredMeds = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return sortedMeds.filter((med) => {
      return (
        (med.itemName && med.itemName.toLowerCase().includes(term)) ||
        (med.itemGenericName && med.itemGenericName.toLowerCase().includes(term)) ||
        (med.company && med.company.toLowerCase().includes(term))
      );
    });
  }, [sortedMeds, searchTerm]);

  const currentMeds = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMeds.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMeds, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredMeds.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 roboto-regular">
        <Helmet><title>Manage Medicines</title></Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Medicines List</h2>
      <button
        type="button"
        className='bg-blue-500 px-8 mb-4 float-right mr-8 py-2 rounded-xl text-white text-center'
        onClick={openAddModal}
      >
        <FaPlus />
      </button>

      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Product Name</th>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Company</th>
                <th className="px-4 py-2  border-b">Category</th>
                <th className="px-4 py-2 border-b">
                  <button onClick={handleSort} className="flex items-center justify-center">
                    Price <FontAwesomeIcon icon={faSort} className="ml-2" />
                  </button>
                </th>
                <th className="px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMeds.map((med) => (
                <tr key={med._id} className="text-center">
                  <td className="px-4  border-b">{med.itemName}</td>
                  <td className="h-48 w-auto px-4 py-2 border-b flex justify-center items-center">
                    <img src={med.image} alt="" className='my-0' style={{ height: '100px' }} />
                  </td>
                  <td className="px-4  border-b">{med.company}</td>
                  <td className="px-4  border-b">{med.category}</td>
                  <td className="px-4  border-b">{med.price}</td>
                  <td className="px-4  border-b">
                    <button onClick={() => openModal(med._id)} className="text-blue-500 hover:text-blue-700 mx-2">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    {/* Uncomment this if the add to cart functionality is needed */}
                    {/* <button
                      onClick={() => handleAddToCart(med)}
                      className="text-green-500 hover:text-green-700 mx-2"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:bg-gray-100"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}

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
      <Add isOpen={isAddModalOpen} onClose={closeAddModal} />
    </div>
  );
};

export default SellerIndex;
