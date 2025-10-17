import React from 'react'
import { IoAirplane } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-around items-center py-5'>
      <span className='flex gap-1 font-bold'>
        <div className='p-1 rounded-full bg-blue-600 text-white'>
        <IoAirplane size={18} />
      </div> Argo</span>

        <div className='flex gap-4'>
          <Link to='/'>Home</Link>
          <Link to='/'>My Bookings</Link>
          <Link to='/'>Profile</Link>
          <Link to='/'>Admin</Link>
        </div>

        <span>Pic</span>
    </div>
  )
}

export default Navbar