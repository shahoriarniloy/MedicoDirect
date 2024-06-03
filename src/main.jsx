import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/router';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider } from './Theme';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <RouterProvider router={router} />


      </ThemeProvider>


    </AuthProvider>
   </React.StrictMode>,
)
