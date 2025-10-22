import React, { useState, useRef, useEffect } from 'react';
import { IoAirplane, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='flex justify-between px-10 items-center py-5 bg-white shadow-sm'>
      <Link to="/" className='flex gap-1 font-bold text-xl text-gray-800'>
        <div className='p-1 rounded-full bg-blue-600 text-white'>
          <IoAirplane size={18} />
        </div> 
        <span className='ml-1'>Argo</span>
      </Link>

      <div className='flex gap-5'>
        <Link className='hover:text-blue-800 transition-colors' to='/'>Home</Link>
        <Link className='hover:text-blue-800 transition-colors' to='/my-bookings'>My Bookings</Link>
        <Link className='hover:text-blue-800 transition-colors' to='/profile'>Profile</Link>
        <Link className='hover:text-blue-800 transition-colors' to='/admin'>Admin</Link>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors">
            <img 
              src={user?.profileImage || "https://randomuser.me/api/portraits/men/84.jpg"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <IoLogOutOutline className="mr-2" size={16} />
                Logout
              </button>
            ) : (
              <>
                <button 
                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center' 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/login');
                  }}
                >
                  Login
                </button>
                <button 
                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center' 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/register');
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;