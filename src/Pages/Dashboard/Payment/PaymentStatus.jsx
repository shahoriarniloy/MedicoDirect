import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const PaymentList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    }
  });

  const acceptPayment = async (paymentId,cartIds) => {
    try {
      const response = await axiosSecure.put(`/payments/${paymentId}`);
      const response2 = await axiosSecure.patch(`/payments/${paymentId}`, cartIds);

      refetch(); 
    } catch (error) {
      console.error('Error accepting payment:', error);
    }
  };

  return (
    <div>
            <h2 className='text-4xl text-center text-blue-500 mb-12'>Payment Management</h2>


<table className="min-w-full text-xs">
      <thead className="dark:bg-gray-300">
        <tr className="text-left">
          <th className="p-3">Invoice #</th>
          <th className="p-3">Client</th>
          <th className="p-3">Issued</th>
          <th className="p-3 text-right">Amount</th>
          <th className="p-3 text-center">Status</th>
          <th className="p-3">Action</th> 
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
            <td className="p-3">{payment._id}</td>
            <td className="p-3">{payment.email}</td>
            <td className="p-3">{new Date(payment.date).toLocaleDateString()}</td>
            <td className="p-3 text-right">{payment.price}</td>
            <td className="p-3 text-center">
                <span className={payment.status === 'pending' ? 'text-red-500' : 'text-green-500'}>
                    {payment.status}
                </span>
            </td>

            <td className="p-3 flex justify-center">
              {payment.status === 'pending' && (
                <button className='px-3 py-1 font-semibold rounded-md bg-blue-500 text-white' onClick={() => acceptPayment(payment._id, payment.cartIds)}>Accept Payment</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default PaymentList;
