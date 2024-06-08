import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
import { Helmet } from "react-helmet";


const SellerHome = () => {
  const { category } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth(); 
  let totalPending = 0;
  let totalPaid = 0;
  let totalPrice = 0;
  let totalPaidPrice=0;
  let totalPendingPrice=0;
  let totalSells=0;


  

  
  const { data: invoices = [], error, isLoading } = useQuery({
    queryKey: ['invoices', category],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/invoices/${user.email}`);
        // console.log('invoice return:',response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error;
      }
    }
  });

  invoices.forEach(invoice => {
    if (invoice.status === 'pending') {
        totalPending++;
        totalPendingPrice += invoice.price;
    } else {
        totalPaid++;
        totalPaidPrice += invoice.price;
    }
    totalSells++;
    totalPrice += invoice.price;
});

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error fetching invoice.</div>;
  }

  return (
    <div className='roboto-regular'>
        <Helmet><title>Seller Dashboard</title></Helmet>

                <h1 className="text-blue-900 text-2xl font-bold ml-2 text-center">Medico<span className="text-3xl text-yellow-600">Direct</span></h1>


                <div className='bg-blue-900 text-white text-lg rounded-lg p-16 mb-8'>
            <div className='flex justify-between'>
                <h2>Total Sells: {totalSells} </h2> 
                <h2>Total Amount:{totalPrice}</h2>
           </div>
           <div className='flex justify-between'>
                <h2>Pending Sells: {totalPending} </h2> 
                <h2>Total Pending Amount:{totalPendingPrice}</h2>
           </div>
           <div className='flex justify-between'>
                <h2>Paid Sells: {totalPaid} </h2> 
                <h2>Total Paid Amount:{totalPaidPrice}</h2>
           </div>
            </div>
      



      <table className="min-w-full text-xs">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col className="w-24" />
                                </colgroup>
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Invoice #</th>
                                        <th className="p-3">Client</th>
                                        <th className="p-3 text-right">Amount</th>
                                        <th className="p-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map(invoice => (
                                        <tr key={invoice._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                            <td className="p-3">
                                                <p>{invoice._id}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{invoice.email}</p>
                                            </td>
                                           
                                            <td className="p-3 text-right">
                                                <p>{invoice.price}</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                                    <span>{invoice.status}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
    </div>
  );
};

export default SellerHome;
