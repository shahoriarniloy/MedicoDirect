import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';
import { useLocation } from 'react-router-dom';
import '../App.css'

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login')|| location.pathname.includes('signup');
    return (
        <div className='roboto-regular bg-gradient-to-r from-green-50 to-green-100'>
            
            <Navbar></Navbar>
            <Outlet></Outlet>
            {noHeaderFooter||<Footer></Footer>}
        </div>
    );
};

export default Main;