import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='bg-slate-200 flex flex-col justify-center items-center gap-3'>
                <h1 className='font-bold text-4xl'>Find Your Next Journey</h1>
                <p className='font-thin'>Discover available seats and book your seats with ease.</p>
            </div>
        </>
    )
}

export default Home