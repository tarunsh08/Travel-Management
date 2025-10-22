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
                const bookingsData = Array.isArray(response) ? response : (response?.bookings || []);
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
        return <div className="p-4">Please log in to view your bookings</div>;
    }

    if (loading) {
        return <div className="p-4">Loading your bookings...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h1>
                {bookings.length === 0 ? (
                    <p className="text-gray-600">You don't have any bookings yet.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {booking._id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {booking.tripId && (
                                                <div className="text-sm text-gray-900">
                                                    <div className="font-medium">{booking.tripId.from} → {booking.tripId.to}</div>
                                                    <div className="text-gray-500">
                                                        {booking.tripId.departureTime && 
                                                            new Date(booking.tripId.departureTime).toLocaleDateString()
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(booking.bookingDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking.seats?.length || 0} seat{booking.seats?.length !== 1 ? 's' : ''}
                                            {booking.seats?.length > 0 && (
                                                <div className="text-xs text-gray-500">
                                                    {booking.seats.join(', ')}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyBookings;