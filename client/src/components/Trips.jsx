import React from 'react'
import { useTrips } from '../context/TripContext'
import { useNavigate } from 'react-router-dom';

const Trips = () => {
    const { trips } = useTrips();
    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {trips.map((trip) => (
                <div key={trip._id} className='flex flex-col gap-3 items-center p-6 border border-slate-200 rounded-2xl'>
                    <h2 className='font-semibold text-xl'>From: {trip.from}</h2>
                    <p className='font-semibold text-xl'>To: {trip.to}</p>
                    <p className='font-semibold text-xl'>Date: {new Date(trip.date).toLocaleDateString()}</p>
                    <p className='font-semibold text-xl'>Time: {trip.time}hrs</p>
                    <p className='font-semibold text-xl'>Price: ₹{trip.price}</p>
                    <p className='font-semibold text-xl'>Available Seats: {trip.availableSeats}</p>
                    <button className='bg-blue-600 text-white rounded-xl px-8 py-3 font-semibold hover:bg-blue-700 transition-colors duration-200 h-fit shadow-md hover:shadow-lg' onClick={() => navigate(`/booking/${trip._id}`)}>Book Now</button>
                </div>
            ))}
        </div>
    )
}

export default Trips