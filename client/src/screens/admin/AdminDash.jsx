import { useEffect, useCallback } from "react";
import { useTrips } from "../../context/TripContext";
import AddTripForm from "../../components/admin/AddTripForm";
import TripList from "../../components/admin/TripList";
import Navbar from "../../components/Navbar";
import { IoLocationOutline } from "react-icons/io5";

const AdminDash = () => {
  const { trips, fetchTrips } = useTrips();

  const fetchData = useCallback(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    // fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-start">Admin Dashboard</h1>
        </div>
            <h1 className="text-lg font-semibold text-gray-900 text-start">Admin Overview</h1>
        <div className="flex justify-around items-center py-5">
            <div className="border border-gray-200 rounded-lg p-2">
                <span className="flex items-center gap-4">
                <IoLocationOutline color="blue"/>
                <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
                </span>
                <p>Total Trips</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
                <span className="flex items-center gap-4">
                <IoLocationOutline color="green"/>
                <p className="text-2xl font-bold text-gray-900">{2}</p>
                </span>
                <p>Total Bookings</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
                <span className="flex items-center gap-4">
                <IoLocationOutline color="red"/>
                <p className="text-2xl font-bold text-gray-900">{6}</p>
                </span>
                <p>Upcoming Departures</p>
            </div>
        </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Trip Management</h2>
              </div>
              <TripList trips={trips} />
            </div>
          </div>
          <div className="w-[90%] mx-auto mt-10">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Add New Trip</h2>
              <AddTripForm />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;