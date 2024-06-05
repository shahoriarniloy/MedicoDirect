import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 
import { BsPaypal, BsBadgeAd, BsCashCoin, BsClipboardData } from "react-icons/bs"; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImHome } from "react-icons/im";
import UseAdmin from '../Hooks/UseAdmin';

const Dashboard = () => {
    const [isAdmin] = UseAdmin();
    console.log(
        isAdmin
    );

    return (
        <div className='flex'>
            <div className="w-64 h-screen bg-blue-600 text-white pl-4 pt-4">
                <ul className='menu flex flex-col gap-8'>
                    {isAdmin && (
                        <>
                            <li className='flex flex-row items-center'>
                                <FaUser />
                                <NavLink to="/dashboard/users" activeClassName="text-yellow-300">
                                    &nbsp; Manage Users
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsClipboardData />
                                <NavLink to="/category/index" activeClassName="text-yellow-300">
                                    &nbsp; Manage Category
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsPaypal />
                                <NavLink to="" activeClassName="text-yellow-300">
                                    &nbsp; Payment Management
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsCashCoin />
                                <NavLink to="/admin/cart" activeClassName="text-yellow-300">
                                    &nbsp; Sales Report
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsBadgeAd />
                                <NavLink to="/dashboard/cart" activeClassName="text-yellow-300">
                                    &nbsp; Banner Advertise
                                </NavLink>
                            </li>
                            <hr className='my-8 mr-2' />
                        </>
                    )}
                    <li className='flex flex-row items-center'>
                        <ImHome />
                        <NavLink to="/" activeClassName="text-yellow-300">
                            &nbsp; Home
                        </NavLink>
                    </li>
                    <li className='flex flex-row items-center'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <NavLink to="/medicine/index" activeClassName="text-yellow-300">
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
