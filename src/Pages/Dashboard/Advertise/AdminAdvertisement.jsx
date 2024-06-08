import { useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";


const AdminAdvertisement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: meds = [], refetch } = useQuery({
        queryKey: ['meds'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/medicines');
                console.log(res.data);
                return res.data;
            } catch (error) {
                console.error('Error fetching medicines:', error);
                return [];
            }
        }
    });


   

    const handleAdvertise = async (med) => {
        try {
            const updatedMed = { ...med, advertise: 'yes' };
            await axiosSecure.put(`/medicines/${med._id}`, updatedMed);
            toast.success("Added To Advertise");
            refetch();
        } catch (error) {
            console.error('Error advertising medicine:', error);
        }
    };

    let filteredMeds = [...meds];
   

    const handleRemoveAdvertise = async (med) => {
        try {
            const updatedMed = { ...med, advertise: 'yes' };
            await axiosSecure.put(`/medicines-remove/${med._id}`, updatedMed);
            toast.success("Removed From Advertise");
            refetch();
        } catch (error) {
            console.error('Error advertising medicine:', error);
        }
    };

    return (
        <div className="">
            <Helmet><title>Manage Advertisement</title></Helmet>
            <h1 className='text-2xl text-blue-900 text-center'>Advertise Medicines</h1>
            
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Product Name</th>
                        <th className="px-4 py-2 border-b">Image</th>
                        <th className="px-4 py-2 border-b">Company</th>
                        <th className="px-4 py-2 border-b">Category</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMeds.map((med) => (
                        <tr key={med._id} className="text-center">
                            <td className="px-4 py-2 border-b">{med.itemName}</td>
                            <td className="h-48 w-auto px-4 py-2 border-b">
                                <img src={med.image} alt="" style={{ height: '100px' }} />
                            </td>
                            <td className="px-4 py-2 border-b">{med.company}</td>
                            <td className="px-4 py-2 border-b">{med.category}</td>
                            {/* <td className="px-4 py-2 border-b">
                                {renderAdvertiseButton(med)}
                            </td> */}
                           {med.advertise === 'requested' && (
                            <td className="px-4 py-2 border-b">
                                <button onClick={() => handleAdvertise(med)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Approve Request
                                </button>
                            </td>
                        )}
                        {med.advertise === 'yes' && (
                            <td className="px-4 py-2 border-b">
                                <button onClick={() => handleRemoveAdvertise(med)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Remove from Slide
                                </button>
                            </td>
                        )}
                        {med.advertise === 'no' && (
                            <td className="px-4 py-2 border-b">
                                <button onClick={() => handleAdvertise(med)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Add to Slide
                                </button>
                            </td>
                        )}
                                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAdvertisement;
