import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../../App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MedicineForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/medicines', data);
      toast.success('Medicine information added successfully');
      reset();
    } catch (error) {
      toast.error('There was an error adding the medicine information!', error);
    }
  };

  return (
    <div className='roboto-regular text-sm'>
      <form className="w-1/2 mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl text-blue-600 font-bold text-center mb-12 mt-16">Add Medicine Information</h2>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              {...register('productName', { required: 'Product Name is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700">Brand Name</label>
            <input
              type="text"
              {...register('brandName', { required: 'Brand Name is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.brandName && <p className="text-red-500">{errors.brandName.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Generic Name</label>
            <input
              type="text"
              {...register('genericName', { required: 'Generic Name is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.genericName && <p className="text-red-500">{errors.genericName.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option disabled value="">Select Category</option>
              <option value="syrup">Syrup</option>
              <option value="capsule">Capsule</option>
              <option value="tablet">Tablet</option>
              <option value="ointment">Ointment</option>
              <option value="inhaler">Inhaler</option>
              <option value="spray">Spray</option>
              <option value="patch">Patch</option>
            </select>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Strength</label>
            <input
              type="text"
              {...register('strength', { required: 'Strength is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.strength && <p className="text-red-500">{errors.strength.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Packaging</label>
            <input
              type="text"
              {...register('packaging', { required: 'Packaging is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.packaging && <p className="text-red-500">{errors.packaging.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Price</label>
            <input
              type="number"
              {...register('price', { required: 'Price is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Image</label>
            <input
              type="text"
              {...register('image', { required: 'Image URL is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Manufacturer</label>
            <input
              type="text"
              {...register('manufacturer', { required: 'Manufacturer is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.manufacturer && <p className="text-red-500">{errors.manufacturer.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block text-gray-700 mt-4">Expiration Date</label>
            <input
              type="date"
              {...register('expirationDate', { required: 'Expiration Date is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.expirationDate && <p className="text-red-500">{errors.expirationDate.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Indications</label>
            <textarea
              {...register('indications', { required: 'Indications are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.indications && <p className="text-red-500">{errors.indications.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Dosage Instructions</label>
            <textarea
              {...register('dosageInstructions', { required: 'Dosage Instructions are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.dosageInstructions && <p className="text-red-500">{errors.dosageInstructions.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Side Effects</label>
            <textarea
              {...register('sideEffects', { required: 'Side Effects are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.sideEffects && <p className="text-red-500">{errors.sideEffects.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Warnings</label>
            <textarea
              {...register('warnings', { required: 'Warnings are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.warnings && <p className="text-red-500">{errors.warnings.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Contraindications</label>
            <textarea
              {...register('contraindications', { required: 'Contraindications are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.contraindications && <p className="text-red-500">{errors.contraindications.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Storage Instructions</label>
            <textarea
              {...register('storageInstructions', { required: 'Storage Instructions are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.storageInstructions && <p className="text-red-500">{errors.storageInstructions.message}</p>}
          </div>

          <div className="w-full px-3 mb-6 md:w-full md:mb-0">
            <label className="block text-gray-700 mt-4">Ingredients</label>
            <textarea
              {...register('ingredients', { required: 'Ingredients are required' })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
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
