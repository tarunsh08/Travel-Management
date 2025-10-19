import React, { useEffect, useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaChair } from "react-icons/fa6";
import { FaTrainSubway } from "react-icons/fa6";
import { CiCreditCard2 } from "react-icons/ci";
import { IoAirplane } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { createBooking } from "../api/bookings";
import { useAuth } from "../context/AuthContext";

const Payment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const { trip, fetchTripById } = useTrips();

  const { id } = useParams();
  const { state } = useLocation();
  const { selectedSeats } = state || {};
  const { user } = useAuth();

  useEffect(() => {
    if (id && (!trip || trip._id !== id)) {
      fetchTripById(id);
    } 
  }, [id, fetchTripById, trip]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading trip details...</p>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const bookingData = {
        userId: user._id,
        tripId: trip._id,
        seats: selectedSeats,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      const response = await createBooking(bookingData);
      console.log(response);
      navigate(`/confirmation/${trip._id}`, { state: { booking: response } });
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Checkout & Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Your Information
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Please provide your contact details for this booking
            </p>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Your Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Method
            </h2>

            <div className="space-y-3 mb-4">
              <label
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${
                  method === "card"
                    ? "bg-blue-50 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <span className="font-medium text-gray-800 flex gap-1 items-center">
                  <CiCreditCard2 size={17} /> Credit or Debit Card
                </span>
              </label>

              <label
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${
                  method === "wallet"
                    ? "bg-blue-50 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "wallet"}
                  onChange={() => setMethod("wallet")}
                />
                <span className="font-medium text-gray-800 flex gap-1 items-center">
                  <CiCreditCard2 size={17} /> Digital Wallet (e.g., PayPal, Apple Pay)
                </span>
              </label>
            </div>

            {method === "card" && (
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="**** **** **** ****"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="MM/YY"
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="CVV"
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Booking Summary
          </h2>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg h-24 flex items-center justify-center mb-4">
            <span className="text-white text-2xl"><IoAirplane /></span>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="flex items-center gap-1"><FaLocationPin size={17} color="blue" /> Route:</span>
              <span className="font-medium text-gray-900">
                {trip.from} to {trip.to}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1"><SlCalender size={17} color="blue" /> Date:</span>
              <span className="font-medium text-gray-900">{new Date(trip.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1"><MdOutlineAccessTime size={17} color="blue" /> Time:</span>
              <span className="font-medium text-gray-900">{trip.time}hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1"><FaTrainSubway size={17} color="blue" /> Transport:</span>
              <span className="font-medium text-gray-900">Flight</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1"><FaChair size={17} color="blue" /> Seats:</span>
              <span className="font-medium text-gray-900">{selectedSeats?.join(', ')}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="flex justify-between items-center text-gray-800">
            <span className="font-semibold text-lg">Total Fare:</span>
            <span className="text-blue-600 font-bold text-lg">USD {trip.price}</span>
          </div>

          <button onClick={handlePayment} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-5 hover:bg-blue-700 transition-colors">
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
