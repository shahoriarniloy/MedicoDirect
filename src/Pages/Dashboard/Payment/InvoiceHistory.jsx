import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import UseAxiosSecure from '../../../Hooks/UseAxiosPublic';
import UseAuth from '../../../Hooks/UseAuth';
import { Oval } from 'react-loader-spinner';
import { Helmet } from "react-helmet";
import UseSeller from '../../../Hooks/UseSeller';


const InvoiceHistory = () => {
  const { category } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth(); 
  const [  isLoadingSeller] = UseSeller();


  const { data: invoices = [], error, isLoading } = useQuery({
    queryKey: ['invoices', category],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/invoices/${user.email}`);
        // console.log(response.data);
        return response;
      } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error;
      }
    }
  });
  

  if (isLoading || isLoadingSeller) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching invoice.</div>;
  }

  return (
    <div className='roboto-regular'>
        <Helmet>
            <title>Invoice History</title>
        </Helmet>
      <h1 className="text-blue-900 text-2xl font-bold ml-2 text-center">
        Medico<span className="text-3xl text-yellow-600">Direct</span>
      </h1>

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
          {invoices.data.map(invoice => (
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

export default InvoiceHistory;
