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
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import PrivateRoutes from "./PrivateRoutes";
import UpdateProfile from "../Login/UpdateProfile";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<RouteNotFound></RouteNotFound>,
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
            element: <PrivateRoutes><CartPayment></CartPayment></PrivateRoutes> 
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
        {
            path:"/update-profile",
            element: <UpdateProfile></UpdateProfile>
        },
      ]
    },
    {
        path:'/dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:'/dashboard',
                element:<PrivateRoutes><DashboardHome></DashboardHome></PrivateRoutes> 
            },
            {
                path:'/dashboard/admin/payments',
                element:<PrivateRoutes><AdminCart></AdminCart></PrivateRoutes> 
            },
            {
                path:'/dashboard/users',
                element:<PrivateRoutes><UserIndex></UserIndex></PrivateRoutes> 
            },
            {
                path:"/dashboard/category/index",
                element:<PrivateRoutes><CategoryIndex></CategoryIndex></PrivateRoutes> 
            },
            {
                path:"/dashboard/invoice/:transactionId",
                element:<PrivateRoutes><Invoice></Invoice></PrivateRoutes> 
            },
            {
                path:"/dashboard/invoices/:email",
                element:<PrivateRoutes><InvoiceHistory></InvoiceHistory></PrivateRoutes> 
            },
            {
                path:"/dashboard/payment/status",
                element:<PrivateRoutes><PaymentStatus></PaymentStatus></PrivateRoutes> 
            },
            
            {
                path:"/dashboard/medicine/create",
                element:<PrivateRoutes><CreateMedicine></CreateMedicine></PrivateRoutes> 
            },
            {
                path:"/dashboard/seller/medicine/index",
                element:<PrivateRoutes><SellerIndex></SellerIndex></PrivateRoutes> 
            }, 
            {
                path:"/dashboard/sales",
                element:<PrivateRoutes><SalesReport></SalesReport></PrivateRoutes> 
            },
            {
                path:"/dashboard/advertise",
                element:<PrivateRoutes> <Advertise></Advertise></PrivateRoutes>
            }, {
                path:"/dashboard/banner-advertise",
                element:<PrivateRoutes><AdminAdvertisement></AdminAdvertisement></PrivateRoutes> 
            },
            
           
            
           
        ]

    }
  ]);