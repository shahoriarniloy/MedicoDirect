import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Dashboard from "../Layout/Dashboard";
import CreateMedicine from "../Pages/Medicine/Add";
import MedicinesIndex from "../Pages/Medicine/Index";

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
        }
      ]
    },
    {
        path:'dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:'cart'
            }
        ]

    }
  ]);