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
import Payment from "../Pages/Dashboard/Payment/Payment";
import Invoice from "../Pages/Dashboard/Payment/Invoice";
import RouteNotFound from "./RouteNotFound";
import PaymentStatus from "../Pages/Dashboard/Payment/PaymentStatus";
import SellerIndex from "../Pages/Dashboard/Medicine/SellerIndex";
import SalesReport from "../Pages/Dashboard/Payment/SalesReport";
import Advertise from "../Pages/Dashboard/Advertise/Advertise";
import AdminAdvertisement from "../Pages/Dashboard/Advertise/AdminAdvertisement";
import UserCategoryIndex from "../Pages/Dashboard/Category/UserCategoryIndex";
import InvoiceHistory from "../Pages/Dashboard/Payment/InvoiceHistory";
import AdminHome from "../Pages/Dashboard/AdminHome";

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
            path:"/cart/payment",
            element: <CartPayment></CartPayment>
        },
        {
            path:"/payment",
            element: <Payment></Payment>
        },
        {
            path:"/medicine/index",
            element: <MedicinesIndex></MedicinesIndex>
        },
        {
            path:"/medicine-by-category/:category",
            element: <UserCategoryIndex></UserCategoryIndex>
        },
      ]
    },
    {
        path:'/dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:'/dashboard',
                element: <AdminHome></AdminHome>
            },
            {
                path:'/dashboard/admin/payments',
                element: <AdminCart></AdminCart>
            },
            {
                path:'/dashboard/users',
                element: <UserIndex></UserIndex>
            },
            {
                path:"/dashboard/category/index",
                element: <CategoryIndex></CategoryIndex>
            },
            {
                path:"/dashboard/invoice/:transactionId",
                element: <Invoice></Invoice>
            },
            {
                path:"/dashboard/invoices/:email",
                element: <InvoiceHistory></InvoiceHistory>
            },
            {
                path:"/dashboard/payment/status",
                element: <PaymentStatus></PaymentStatus>
            },
            
            {
                path:"/dashboard/medicine/create",
                element: <CreateMedicine></CreateMedicine>
            },
            {
                path:"/dashboard/seller/medicine/index",
                element: <SellerIndex></SellerIndex>
            }, 
            {
                path:"/dashboard/sales",
                element: <SalesReport></SalesReport>
            },
            {
                path:"/dashboard/advertise",
                element: <Advertise></Advertise>
            }, {
                path:"/dashboard/banner-advertise",
                element: <AdminAdvertisement></AdminAdvertisement>
            },
            
            {
                path: "*",
                element: <RouteNotFound />
            }
            
           
        ]

    }
  ]);