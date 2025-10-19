import { useState, useEffect } from 'react';
import { getBookings } from '../api/bookings';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchBookings = async () => {
        if (!user?._id) return;

        try {
            setLoading(true);
            const response = await getBookings();
            const bookingsData = Array.isArray(response) ? response : response.data || [];
            setBookings(bookingsData);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Failed to load bookings. Please try again later.');
            setBookings([]); 
        } finally {
            setLoading(false);
        }
    };

    fetchBookings();
}, [user?._id]);

    if (!user) {
        return <div>Please log in to view your bookings</div>;
    }

    if (loading) {
        return <div>Loading your bookings...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
            {bookings.length === 0 ? (
                <p>You don't have any bookings yet.</p>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="border rounded-lg p-4 shadow-sm">
                            <p className="font-medium">Booking ID: {booking._id}</p>
                            <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p>Status: <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                                {booking.status}
                            </span></p>
                            {booking.seats && (
                                <p>Seats: {booking.seats.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default MyBookings;