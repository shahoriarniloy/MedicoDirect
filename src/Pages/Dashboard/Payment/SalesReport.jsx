import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesReport = () => {
    const tableRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        className="px-3 py-2 border rounded-md"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                        className="px-3 py-2 border rounded-md"
                    />
                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Filter
                    </button>
                </div>
                <DownloadTableExcel
                    filename="sales_report"
                    sheet="sales"
                    currentTableRef={tableRef.current}
                >
                    <button className='bg-blue-600 text-white py-2 px-6 rounded-lg'>Export Excel</button>
                </DownloadTableExcel>
            </div>
            <h1 className="text-blue-900 text-3xl font-bold ml-2 text-center">Medico<span className="text-4xl text-yellow-600">Direct</span></h1>
            <h2 className='text-2xl text-center text-blue-500 mb-12'>Sales Report</h2>
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
            </table>
        </div>
    );
};

export default SalesReport;
