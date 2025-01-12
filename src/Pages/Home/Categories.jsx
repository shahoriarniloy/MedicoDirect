import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import '../../App.css';
import { Link } from 'react-router-dom';

const Categories = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: categories = [], error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/categories');
        return response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    }
  });

  if (isLoading) {
    return <div className='flex justify-center items-center'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:green-violet-900"></div></div>;
  }

  if (error) {
    return <div>Error fetching categories.</div>;
  }

  return (
    <div className='roboto-regular'>
      <h1 className=' text-black mt-12 text-3xl font-bold mb-8 ml-2 text-center'>Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {categories.map(category => (
          <div key={category._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-[200px] object-cover" src={category.imageUrl} alt={category.name} />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
              <Link to={`/medicine-by-category/${category.name}`}><button className="bg-green-900 text-white py-2 px-4 rounded w-full hover:bg-green-600">
                View
              </button></Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
