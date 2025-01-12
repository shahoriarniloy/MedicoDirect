import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';
import { useLocation } from 'react-router-dom';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { useState, useEffect } from 'react'; 
import '../App.css';
import AOS from 'aos';

import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

  const [isBottom, setIsBottom] = useState(false); 

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    setIsBottom(scrollPosition >= pageHeight - 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="roboto-regular bg-gradient-to-r from-green-50 to-green-100" >
      <Navbar />

      {!noHeaderFooter && !isBottom && (
        <div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-white bg-green-500 rounded-full p-2 hover:bg-green-600 transition duration-300 z-50"
          onClick={scrollToNextSection}
        >
          <MdArrowDownward className="h-6 w-6 text-white" />
        </div>
      )}

      {isBottom && !noHeaderFooter && (
        <div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-white bg-green-500 rounded-full p-2 hover:bg-green-600 transition duration-300 z-50"
          onClick={scrollToTop}
        >
          <MdArrowUpward className="h-6 w-6 text-white" />
        </div>
      )}

      <Outlet />

      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
