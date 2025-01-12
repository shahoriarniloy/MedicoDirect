import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from "react-helmet";


const UserIndex = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `Name: ${user.name} Email: ${user.email} is an Admin Now`,
                        text: "New Admin Added",
                        icon: "success"
                    });
                    refetch();
                }
            });
    };

    const handleMakeSeller = user => {
        axiosSecure.patch(`/users/seller/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `Name: ${user.name} Email: ${user.email} is a Seller Now`,
                        text: "New Seller Added",
                        icon: "success"
                    });
                    refetch();
                }
            });
    };


    const handleMakeUser = user => {
        axiosSecure.patch(`/users/user/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `Name: ${user.name} Email: ${user.email} is a User Now`,
                        text: "User Role Assigned",
                        icon: "success"
                    });
                    refetch();
                }
            });
    };

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <Helmet><title>Manage Users</title></Helmet>
            <h2 className="mb-4 text-2xl font-semibold leading-tight">All Users</h2>
            <div className="overflow-x-auto">
                <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                    <colgroup>
                        <col className="w-5" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-5" />
                    </colgroup>
                    <thead>
                        <tr className="dark:bg-gray-300">
                            <th className="p-3">Serial</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td className="px-3 text-2xl font-medium dark:text-gray-600">{index + 1}</td>
                                <td className="px-3 py-2">
                                    <p>{user.name}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{user.email}</p>
                                </td>
                                <td className="px-3 py-2 text-green-500">
                                    <p>{user.role || 'User'}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <div className='h-fit py-4 mx-2 flex flex-col gap-2'>
                                        <button onClick={() => handleMakeAdmin(user)} className='bg-green-500 rounded-lg text-white w-36'>Make Admin</button>
                                        <button onClick={()=>  handleMakeSeller(user)} className='bg-green-500 rounded-lg text-white w-36'>Make Seller</button>
                                        <button onClick={() => handleMakeUser(user)} className='bg-green-500 rounded-lg text-white w-36'>Make User</button>
                                        <button onClick={() => handleDeleteUser(user)} className='bg-red-500 rounded-lg text-white w-36'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserIndex;
