import { useState } from 'react';
import { IoPencil, IoTrashOutline, IoCheckmark, IoClose } from "react-icons/io5";
import axiosInstance from "../../api/axiosInstance";
import { useTrips } from "../../context/TripContext";

const TripCard = ({ trip: initialTrip }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [trip, setTrip] = useState(initialTrip);
  const { fetchTrips } = useTrips();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await axiosInstance.delete(`/api/trip/trips/${trip._id}`, { withCredentials: true });
      fetchTrips();
    } catch (err) {
      console.error(err);
      alert("Error deleting trip");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.patch(`/api/trip/trips/${trip._id}`, trip, { 
        withCredentials: true 
      });
      await fetchTrips();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating trip:', error);
      alert("Error updating trip");
    }
  };

  const handleCancel = () => {
    setTrip(initialTrip);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              name="from"
              value={trip.from}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              name="to"
              value={trip.to}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={trip.date.split('T')[0]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={trip.time}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={trip.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Seats</label>
            <input
              type="number"
              name="totalSeats"
              value={trip.totalSeats}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <IoCheckmark className="mr-1" /> Save
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IoClose className="mr-1" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-17">
          <div>
            <p className="text-sm font-medium">Route</p>
            <h3 className="font-semibold text-sm">{trip.from} → {trip.to}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-medium">Departure</p>
              <p className="text-sm text-gray-500">{new Date(trip.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm text-gray-500">{trip.time}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Price</p>
            <p className="text-sm text-gray-500">${trip.price}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Seats</p>
            <p className="text-sm text-gray-500">
              {trip.availableSeats || 0} / {trip.totalSeats}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <IoPencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <IoTrashOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;