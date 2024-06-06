import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Dashboard from "../Layout/Dashboard";
import CreateMedicine from "../Pages/Dashboard/Medicine/Add";
import MedicinesIndex from "../Pages/Dashboard/Medicine/Index";
import CreateCategory from "../Pages/Dashboard/Category/CreateCategory";
import CategoryIndex from "../Pages/Dashboard/Category/CategoryIndex";
import AdminCart from "../Pages/Dashboard/AdminCart";
import CartPayment from '../Pages/CartPayment'
import UserIndex from "../Pages/Dashboard/UserIndex";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: "/signup",
            element: <Register></Register>,
        },
        {
            path:"/medicine/index",
            element: <MedicinesIndex></MedicinesIndex>
        },
        {
            path:"/medicine/create",
            element: <CreateMedicine></CreateMedicine>
        },
        
        {
            path:"/cart/payment",
            element: <CartPayment></CartPayment>
        }
      ]
    },
    {
        path:'dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:'/dashboard/admin/payments',
                element: <AdminCart></AdminCart>
            },
            {
                path:'/dashboard/users',
                element: <UserIndex></UserIndex>
            },
            {
                path:"dashboard/category/index",
                element: <CategoryIndex></CategoryIndex>
            },
           
        ]

    }
  ]);