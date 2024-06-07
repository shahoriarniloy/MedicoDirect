import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/router';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider } from './Theme';
import { ToastContainer } from 'react-toastify'


import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer />



      </ThemeProvider>
      </QueryClientProvider>


    </AuthProvider>
   </React.StrictMode>,

)
