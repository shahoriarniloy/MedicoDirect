import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import UseAuth from '../../Hooks/UseAuth'; 
import UseCart from '../../Hooks/UseCart';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = UseAuth(); 
  const [cart] = UseCart();
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    window.addEventListener('scroll', changeBackground);
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setDropdownOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearInterval(timerID);
      window.removeEventListener('scroll', changeBackground);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-10 roboto-regular bg-gradient-to-r from-white via-green-500 to-green-900 transition duration-300 ${navbar ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-black text-2xl font-bold ml-2 text-center">Medico<span className="text-3xl text-green-600">Direct</span></h1>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {/* Links */}
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
          
          <div className='flex'>
            <Link to="/cart/payment" className="text-white hover:text-gray-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1.4-6H6.6M7 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </Link>
            <span className='text-white'>{cart.length}</span>
          </div>
          
          {user ? (
            <div className="relative" ref={profileMenuRef}>
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
              className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-yellow-500 ${location.pathname === '/login' ? 'border-1 border-white' : ''}`}
            >
              Join Us
            </Link>
          )}
        </div>
        <div className=" flex items-center">
          <div className="md:hidden ">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          </div>
          
          <div className="text-white ml-4">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden" ref={menuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 ${location.pathname === '/' ? 'bg-green-700' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/medicine/index"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 ${location.pathname === '/medicine/index' ? 'bg-green-700' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <button
              onClick={toggleDropdown1}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300"
            >
              Languages
            </button>
            {dropdownOpen1 && (
              <div className="px-2 py-2 bg-green-700 rounded-md">
                {['Bengali', 'English', 'French', 'Hindi', 'German'].map((language) => (
                  <Link key={language} to="#" className="block px-3 py-2 text-white hover:bg-gray-100">{language}</Link>
                ))}
              </div>
            )}
            <Link to="/cart/payment" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300">
              Cart ({cart.length})
            </Link>
            {user ? (
              <>
                <Link
                  to="/update-profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Update Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
