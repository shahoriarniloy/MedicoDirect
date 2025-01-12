import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import UseAxiosSecure from '../../../Hooks/UseAxiosPublic';

const UserCategoryIndex = () => {
  const { category } = useParams();
  const axiosSecure = UseAxiosSecure();
  console.log(category);

  

  const { data: medicines = [], error, isLoading } = useQuery({
    queryKey: ['medicines', category],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/categories/${category}`);
        // console.log(response.data);
        return response;
      } catch (error) {
        console.error('Error fetching medicines:', error);
        throw error;
      }
    }
  });

  if (isLoading) {
    return <div className='flex justify-center items-center'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:green-violet-900"></div></div>;
  }

  if (error) {
    return <div>Error fetching medicines.</div>;
  }

  return (
    <div className='roboto-regular'>
      <h1 className='text-center text-4xl text-green-900 pt-16'>Category: {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {medicines.data.map(medicine => (
          <div key={medicine._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-[200px] object-cover" src={medicine.image} alt={medicine.itemGenericName} />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{medicine.itemGenericName}</h2>
              <h2 className="text-lg text-gray-600 mb-2">{medicine.itemName}</h2>
              <p>{medicine.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategoryIndex;
