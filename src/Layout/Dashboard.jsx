import { Outlet, NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsPaypal, BsBadgeAd, BsCashCoin, BsClipboardData } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ImHome } from "react-icons/im";
import UseAdmin from '../Hooks/UseAdmin';
import UseSeller from '../Hooks/UseSeller';

const Dashboard = () => {
    const [ isAdmin,  isLoadingAdmin ] = UseAdmin();
    const [ isSeller,  isLoadingSeller] = UseSeller();

    if (isLoadingAdmin || isLoadingSeller) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;
    }
    return (
        <div className='flex'>
            <div className="w-64 h-screen bg-blue-600 text-white pl-4 pt-4">
                <ul className='menu flex flex-col gap-8'>
                    {isAdmin && (
                        <>
                            <li className='flex flex-row items-center'>
                                <FaUser />
                                <NavLink 
                                    to="/dashboard/users"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Manage Users
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsClipboardData />
                                <NavLink 
                                    to="dashboard/category/index"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Manage Category
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsPaypal />
                                <NavLink 
                                    to="/dashboard/admin/payments"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Payment Management
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsCashCoin />
                                <NavLink 
                                    to="/admin/cart"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Sales Report
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsBadgeAd />
                                <NavLink 
                                    to="/dashboard/banner-advertise"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Banner Advertise
                                </NavLink>
                            </li>
                            <hr className='my-8 mr-2' />
                        </>
                    )}
                    {isSeller && (
                        <>
                            <li className='flex flex-row items-center'>
                                <FaUser />
                                <NavLink 
                                    to="/dashboard/manage-medicine"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Manage Medicine
                                </NavLink>
                            </li>
                            <hr className='my-8 mr-2' />
                        </>
                    )}
                    <li className='flex flex-row items-center'>
                        <ImHome />
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                        >
                            &nbsp; Home
                        </NavLink>
                    </li>
                    <li className='flex flex-row items-center'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <NavLink 
                            to="/medicine/index"
                            className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                        >
                            &nbsp; Shop
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
