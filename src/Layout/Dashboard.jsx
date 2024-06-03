import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex'>
            <div className="w-64 min-h-full bg-blue-600">
                <ul className='meny'>
                    <li>
                        <NavLink to="/dashboard/cart">My Cart</NavLink>
                    </li>
                </ul>

            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;