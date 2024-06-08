import React, { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useParams } from "react-router-dom";
import html2pdf from 'html2pdf.js';

const Invoice = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { transactionId } = useParams();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (transactionId) {
            fetchPayments();
        }
    }, [transactionId]);

    const fetchPayments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosSecure.get(`/invoice/${transactionId}`);
            setPayments([response.data]); 
        } catch (error) {
            setError('Error fetching payments');
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        const element = document.getElementById('invoice');
        const options = {
            margin: 0.5,
            filename: `invoice_${transactionId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };

    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800" id="invoice">
                
                <h1 className="text-blue-900 text-2xl font-bold ml-2 text-center">Medico<span className="text-3xl text-yellow-600">Direct</span></h1>
                <h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2>
                {loading ? (
                    <div className='flex justify-center items-center'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:blue-violet-900"></div></div>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <div  className="overflow-x-auto">
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
                                        <th className="p-3">Issued</th>
                                        <th className="p-3 text-right">Amount</th>
                                        <th className="p-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map(payment => (
                                        <tr key={payment._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                            <td className="p-3">
                                                <p>{payment._id}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{payment.email}</p>
                                            </td>
                                            <td className="p-3">
                                                <p>{payment.date}</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <p>{payment.price}</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                                    <span>{payment.status}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                       
                    </div>
                )}
            </div>
            <button 
                            onClick={handlePrint} 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Print Invoice
                        </button>
        </div>
    );
};

export default Invoice;
