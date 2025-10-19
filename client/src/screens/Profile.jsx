import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getBookings } from '../api/bookings';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getBookings();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const upcomingBookings = bookings?.filter(booking => new Date(booking.trip.date) >= new Date());
  const pastBookings = bookings?.filter(booking => new Date(booking.trip.date) < new Date());

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const BookingCard = ({ booking }) => (
    <div key={booking._id} className='border border-gray-200 rounded-lg p-4 mb-4'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='font-medium'>{booking.trip.destination}</h3>
          <p className='text-sm text-gray-600'>{formatDate(booking.trip.date)}</p>
          <p className='text-sm'>Seats: {booking.seats.join(', ')}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          new Date(booking.trip.date) >= new Date() 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {new Date(booking.trip.date) >= new Date() ? 'Upcoming' : 'Completed'}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className='px-4 md:px-20 py-10 max-w-6xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6'>Your Profile</h2>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Profile Card */}
          <div className='w-full md:w-1/3'>
            <div className='border border-gray-200 rounded-xl p-6'>
              <div className='flex flex-col items-center text-center'>
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} 
                  alt={user.name} 
                  className='w-24 h-24 rounded-full mb-4 object-cover'
                />
                <h2 className='text-xl font-medium'>{user.name}</h2>
                <p className='text-gray-600 mb-4'>{user.email}</p>
                <button className='text-sm text-blue-500 hover:underline'>
                  Manage Profile
                </button>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className='flex-1'>
            <div className='mb-8'>
              <h3 className='text-xl font-semibold mb-4'>Upcoming Trips</h3>
              {loading ? (
                <p>Loading upcoming trips...</p>
              ) : error ? (
                <p className='text-red-500'>{error}</p>
              ) : upcomingBookings?.length > 0 ? (
                upcomingBookings?.map(booking => <BookingCard key={booking._id} booking={booking} />)
              ) : (
                <p className='text-gray-500'>No upcoming trips found.</p>
              )}
            </div>

            <div>
              <h3 className='text-xl font-semibold mb-4'>Past Trips</h3>
              {loading ? (
                <p>Loading past trips...</p>
              ) : error ? (
                <p className='text-red-500'>{error}</p>
              ) : pastBookings?.length > 0 ? (
                pastBookings?.map(booking => <BookingCard key={booking._id} booking={booking} />)
              ) : (
                <p className='text-gray-500'>No past trips found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile