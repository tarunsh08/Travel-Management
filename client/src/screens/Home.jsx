import React from 'react'
import Navbar from '../components/Navbar'
import Trips from '../components/Trips'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='bg-slate-200 flex flex-col justify-center items-center gap-6 py-16 px-4'>
                <h1 className='font-bold text-4xl text-gray-800'>Find Your Next Journey</h1>
                <p className='text-gray-600 text-lg'>Discover available trips and book your seats with ease.</p>
                
                <div className='flex gap-6 bg-white rounded-2xl px-8 py-6 w-full max-w-4xl shadow-lg border border-slate-200'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="from" className='text-gray-700 font-medium text-sm'>From</label>
                        <input 
                            type="text" 
                            id="from" 
                            placeholder='Departure Location' 
                            className='border border-slate-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                        />
                    </div>
                    
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="to" className='text-gray-700 font-medium text-sm'>To</label>
                        <input 
                            type="text" 
                            id="to" 
                            placeholder='Arrival Location' 
                            className='border border-slate-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                        />
                    </div>
                    
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="date" className='text-gray-700 font-medium text-sm'>
                            Date 
                        </label>
                        <input 
                            type="date" 
                            id="date" 
                            className='border border-slate-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                            required 
                        />
                    </div>
                    
                    <button className='bg-blue-600 text-white rounded-xl px-8 py-3 font-semibold hover:bg-blue-700 transition-colors duration-200 h-fit shadow-md hover:shadow-lg'>
                        Search Trips
                    </button>
                </div>
            </div>

            <section className='py-6 flex flex-col gap-2 justify-center items-center'>
                <h2 className='font-bold text-3xl text-gray-800'>Available Trips</h2>
                <p className='text-gray-600 text-lg'>Choose from our carefully selected destinations and enjoy a comfortable journey.</p>

                <Trips />
            </section>
        </>
    )
}

export default Home