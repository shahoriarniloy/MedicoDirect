import { useState, useEffect } from 'react';
import '../../App.css';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  return (
    <nav className={`fixed w-full z-10 roboto-regular ${navbar ? 'bg-blue-600' : 'bg-transparent'} transition duration-300`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold ml-2">MedicoDirec<span className="text-4xl">+</span></span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="text-white hover:text-gray-300">Home</a>
          <a href="#shop" className="text-white hover:text-gray-300">Shop</a>
          <div className="relative">
            <button onClick={toggleDropdown} className="text-white hover:text-gray-300">Languages</button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bengali</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">English</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">French</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hindi</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">German</a>
              </div>
            )}
          </div>
          <a href="#cart" className="text-white hover:text-gray-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1.4-6H6.6M7 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Join Us</button>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
