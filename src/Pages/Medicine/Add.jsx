import { useState } from 'react';
import axios from 'axios';
import '../../App.css'

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    brandName: '',
    genericName: '',
    strength: '',
    packaging: '',
    price: '',
    image: '',
    manufacturer: '',
    expirationDate: '',
    description: '',
    indications: '',
    dosageInstructions: '',
    sideEffects: '',
    warnings: '',
    contraindications: '',
    storageInstructions: '',
    ingredients: '',
     category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/medicines', formData);
      alert('Medicine information added successfully');
      setFormData({
        productName: '',
        brandName: '',
        genericName: '',
        strength: '',
        packaging: '',
        price: '',
        image: '',
        manufacturer: '',
        expirationDate: '',
        description: '',
        indications: '',
        dosageInstructions: '',
        sideEffects: '',
        warnings: '',
        contraindications: '',
        storageInstructions: '',
        ingredients: '',
        category: '',
      });
    } catch (error) {
      console.error('There was an error adding the medicine information!', error);
    }
  };

  return (
    <div className='  roboto-regular text-sm'>
      <form className=" w-1/2 mx-auto p-4" onSubmit={handleSubmit}>
        <h2 className="text-3xl text-blue-600 font-bold text-center mb-12 mt-16">Add Medicine Information</h2>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Generic Name</label>
            <input
              type="text"
              name="genericName"
              value={formData.genericName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mt-4">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option disabled value="">Select Category</option>
              <option value="syrup">Syrup</option>
              <option value="capsule">Capsule</option>
              <option value="tablet">Tablet</option>
              <option value="ointment">Ointment</option>
              <option value="inhaler">Ointment</option>
              <option value="spray">Ointment</option>
              <option value="patch">Ointment</option>
            </select>
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Strength</label>
            <input
              type="text"
              name="strength"
              value={formData.strength}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Packaging</label>
            <input
              type="text"
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Image</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Expiration Date</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Indications</label>
            <textarea
            name="indications"
            value={formData.indications}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Dosage Instructions</label>
            <textarea
            name="dosageInstructions"
            value={formData.dosageInstructions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Side Effects</label>
            <textarea
            name="sideEffects"
            value={formData.sideEffects}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Warnings</label>
            <textarea
            name="warnings"
            value={formData.warnings}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Contraindications</label>
            <textarea
            name="contraindications"
            value={formData.contraindications}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Storage Instructions</label>
            <textarea
            name="storageInstructions"
            value={formData.storageInstructions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Ingredients</label>
            <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            ></textarea>
            </div>

            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
            Add Medicine
            </button>
</form>
</div>
);
};

export default MedicineForm;
