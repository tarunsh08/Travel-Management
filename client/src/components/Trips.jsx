import React from 'react'
import { useTrips } from '../context/TripContext'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCalendar } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';

const Trips = () => {
    const { trips } = useTrips();
    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {trips.map((trip) => (
                <div key={trip._id} className='flex flex-col gap-3 items-center p-6 border border-slate-200 rounded-2xl'>
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.3.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="" className='w-full h-48 object-cover rounded-2xl' />
                    <div className='flex gap-2 items-center'>
                    <h2 className='font-semibold text-sm'>{trip.from}</h2>
                    <FaArrowRight size={10} />
                    <p className='font-semibold text-sm'>{trip.to}</p>
                    </div>
                    <p className='font-semibold text-sm flex items-center gap-1'><IoMdTime /> {trip.time}hrs</p>
                    <p className='font-semibold text-sm flex items-center gap-1'><FaCalendar /> {new Date(trip.date).toLocaleDateString()}</p>
                    <p className='font-semibold text-sm'>{trip.totalSeats - trip.availableSeats} Seats Left</p>
                    <div className='flex items-center justify-between gap-12'>
                        <p className='font-bold text-xl'>${trip.price}</p>
                        <button className='bg-blue-600 text-white rounded-xl px-8 py-2 font-semibold hover:bg-blue-700 transition-colors duration-200 h-fit shadow-lg hover:shadow-xl' onClick={() => navigate(`/booking/${trip._id}`)}>Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Trips