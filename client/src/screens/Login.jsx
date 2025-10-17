import React, { useState } from 'react'
import { IoAirplane } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password)
    }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden'>
        <div className='bg-white p-8'>
          <div className='flex justify-center mb-6'>
            <div className='p-3 rounded-full bg-blue-600 text-white'>
              <IoAirplane size={28}/>
            </div>
          </div>
          
          <h1 className='font-bold text-2xl text-center text-gray-800 mb-2'>
            Log In to Journey Booking Platform
          </h1>
          
          <p className='text-gray-600 text-center mb-8'>
            Welcome back! Please enter your credentials to continue.
          </p>

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label className='block text-gray-700 font-medium mb-2'>Email</label>
              <div className='relative'>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Johnsmith234@gmail.com"
                  className='border border-gray-300 rounded-lg w-full p-3 pl-4 bg-gray-50 text-gray-700 font-medium'
                />
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Password</label>
              <div className='relative'>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="23546887"
                  className='border border-gray-300 rounded-lg w-full p-3 pl-4 bg-gray-50 text-gray-700 font-medium'
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <button type="button" className='text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors'>
                Forgot password?
              </button>
            </div>

            <button 
              type="submit"
              className='bg-blue-600 w-full p-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors'
            >
              Log In
            </button>
          </form>

          <div className='text-center mt-6'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <button type="button" onClick={() => navigate('/register')} className='text-blue-600 cursor-pointer font-semibold hover:text-blue-700 transition-colors'>
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login