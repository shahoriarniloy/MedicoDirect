import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import UseAuth from '../../Hooks/UseAuth'; 
import UseCart from '../../Hooks/UseCart';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = UseAuth(); 
  const [cart]=UseCart();
  

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const toggleDropdown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };
  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/login');
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  return (
    <nav className={`fixed w-full z-10 roboto-regular bg-blue-600 transition duration-300 ${navbar ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold ml-2">MedicoDirec<span className="text-4xl">+</span></span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ${location.pathname === '/' ? 'border-b-2 border-white' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/medicine/index"
            className={`text-white hover:text-gray-300 ${location.pathname === '/medicine/index' ? 'border-b-2 border-white' : ''}`}
          >
            Shop
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown1}
              className="text-white hover:text-gray-300"
              aria-haspopup="true"
              aria-expanded={dropdownOpen1}
            >
              Languages
            </button>
            {dropdownOpen1 && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {['Bengali', 'English', 'French', 'Hindi', 'German'].map((language) => (
                  <Link key={language} to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{language}</Link>
                ))}
              </div>
            )}
          </div>
          <div className='flex'>
          <Link to="/cart/payment" className="text-white hover:text-gray-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1.4-6H6.6M7 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </Link>
          <span className='text-white'>{cart.length}</span>
          </div>
          
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown2}
                className="text-white hover:text-gray-300"
                aria-haspopup="true"
                aria-expanded={dropdownOpen2}
              >
                <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
              </button>
              {dropdownOpen2 && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link to="/update-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Update Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${location.pathname === '/login' ? 'border-b-2 border-white' : ''}`}
            >
              Join Us
            </Link>
          )}
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
