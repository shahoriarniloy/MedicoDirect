
import UseAxiosSecure from '../../Hooks/UseAxiosSecure'; 
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import 'react-datepicker/dist/react-datepicker.css';
const AdminHome = () => {
    const tableRef = useRef(null);
    const axiosSecure = UseAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    let totalPending = 0;
    let totalPaid = 0;
    let totalPrice = 0;
    let totalPaidPrice=0;
    let totalPendingPrice=0;
    let totalSells=0;

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments', startDate, endDate],
        queryFn: async () => {
            const params = {};
            if (startDate) params.startDate = startDate.toISOString();
            if (endDate) params.endDate = endDate.toISOString();
            const res = await axiosSecure.get('/sales', { params });
            return res.data;
        }
    });

    const handleFilter = () => {
        refetch();
    };

    payments.forEach(payment => {
        if (payment.status === 'pending') {
            totalPending++;
            totalPendingPrice += payment.price;
        } else {
            totalPaid++;
            totalPaidPrice += payment.price;
        }
        totalSells++;
        totalPrice += payment.price;
    });

    return (
        <div>
           
            <div className="flex justify-between mb-4">
                
                
            </div>
            <h1 className="text-blue-900 text-3xl font-bold ml-2 mb-8 text-center">Medico<span className="text-4xl text-yellow-600">Direct</span></h1>
            <div className='bg-blue-900 text-white text-lg rounded-lg p-16'>
            <div className='flex justify-between'>
                <h2>Total Sells: {totalSells} </h2> 
                <h2>Total Amount:{totalPrice}</h2>
           </div>
           <div className='flex justify-between'>
                <h2>Pending Sells: {totalPending} </h2> 
                <h2>Total Pending Amount:{totalPendingPrice}</h2>
           </div>
           <div className='flex justify-between'>
                <h2>Paid Sells: {totalPending} </h2> 
                <h2>Total Paid Amount:{totalPaidPrice}</h2>
           </div>
            </div>
            <h2 className='text-xl text-center text-blue-900 mt-8'>All Sales</h2>
            <DownloadTableExcel
                    filename="sales_report"
                    sheet="sales"
                    currentTableRef={tableRef.current}
                >
                    <button className='bg-blue-900 text-white py-2 px-6 float-right rounded-lg mb-8'>Export Excel</button>
                </DownloadTableExcel>
            <table ref={tableRef} className="min-w-full text-xs">
                <thead className="dark:bg-gray-300">
                    <tr className="text-left">
                        <th className="p-3">Invoice #</th>
                        <th className="p-3">Medicine #</th>
                        <th className="p-3">Buyer</th>
                        <th className="p-3">Seller</th>
                        <th className="p-3">Date</th>
                        <th className="p-3 text-right">Total Price</th>
                        <th className="p-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                            <td className="p-3">{payment._id}</td>
                            <td className="p-3">{payment.itemName}</td>
                            <td className="p-3">{payment.email}</td>
                            <td className="p-3">{payment.sellerEmail}</td>
                            <td className="p-3">{payment.purchaseDate}</td>
                            <td className="p-3 text-right">{payment.price}</td>
                            <td className="p-3 text-center">
                                <span className={!payment.status || payment.status === 'pending' ? 'text-red-500' : 'text-green-500'}>
                                    {!payment.status || payment.status === 'pending' ? 'pending' : 'paid'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* Display totalPending and totalPaid in table footer */}
                <tfoot>
                    <tr>
                        <td colSpan="6" className="p-3 text-right">Total Pending: {totalPending}</td>
                        <td colSpan="1" className="p-3 text-center">Total Paid: {totalPaid}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AdminHome;
