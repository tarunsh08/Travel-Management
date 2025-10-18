import React, { useState } from 'react'
import { IoAirplane } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const {register} = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden'>
                <div className='bg-white p-8'>
                    <div className='flex justify-center mb-6'>
                        <div className='p-3 rounded-full bg-blue-600 text-white'>
                            <IoAirplane size={28} />
                        </div>
                    </div>

                    <h1 className='font-bold text-2xl text-center text-gray-800 mb-2'>
                        Create your Account
                    </h1>

                    <p className='text-gray-600 text-center mb-8'>
                        Join us today and get started.
                    </p>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullName" className='block text-gray-700 font-medium mb-2'>
                                Full Name
                            </label>
                            <div className='relative'>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className='border border-gray-300 rounded-lg w-full p-3 pl-4 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-2'>
                                Email
                            </label>
                            <div className='relative'>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Johnsmith234@gmail.com"
                                    className='border border-gray-300 rounded-lg w-full p-3 pl-4 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className='block text-gray-700 font-medium mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="23546887"
                                    className='border border-gray-300 rounded-lg w-full p-3 pl-4 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        {error && <p className='text-red-500 mt-2'>{error}</p>}

                        <button
                            type="submit"
                            className='bg-blue-600 w-full p-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className='text-center mt-6'>
                        <p className='text-gray-600'>
                            Already have an account?{' '}
                            <button onClick={() => navigate('/login')} type="button" className='text-blue-600 cursor-pointer font-semibold hover:text-blue-700 transition-colors focus:outline-none focus:underline'>
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register