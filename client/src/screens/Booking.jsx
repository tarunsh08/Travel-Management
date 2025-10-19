import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTrips } from "../context/TripContext";
import SeatSelection from "../components/SeatSelection";
import axiosInstance from "../api/axiosInstance"; 
import "./Booking.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trip, loading, fetchTripById } = useTrips();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (id && (!trip || trip._id !== id)) {
      fetchTripById(id);
    }
  }, [id, fetchTripById, trip]);

  const handleConfirmBooking = async () => {
    console.log("Selected seats:", selectedSeats);
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    try {
      setCreating(true);
      const res = await axiosInstance.post(
        "/api/booking/bookings",
        {
          tripId: trip._id,
          seats: selectedSeats,
        },
        { withCredentials: true } 
      );
      console.log(res.data)
      navigate(`/payment/${res.data.booking.tripId}`, {
        state: {
          selectedSeats: selectedSeats
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <Navbar />
        <div className="not-found">
          <h2>Trip not found</h2>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Trip"
          className="trip-image"
        />

        <div className="trip-card">
          <h2 className="trip-title">Trip Details</h2>

          <div className="trip-row">
            <div className="trip-item">
              <p className="trip-label">From</p>
              <p className="trip-value">{trip.from}</p>
            </div>
            <div className="trip-item right">
              <p className="trip-label">To</p>
              <p className="trip-value">{trip.to}</p>
            </div>
          </div>

          <div className="trip-row">
            <div className="trip-item">
              <p className="trip-label">Date</p>
              <p className="trip-value">
                {new Date(trip.date).toLocaleDateString()}
              </p>
            </div>
            <div className="trip-item right">
              <p className="trip-label">Time</p>
              <p className="trip-value">{trip.time} hrs</p>
            </div>
          </div>

          <div className="fare-section">
            <p className="fare-label">Fare per seat</p>
            <p className="fare-value">₹{trip.price}</p>
          </div>

          <SeatSelection onSelectSeats={setSelectedSeats} tripId={trip._id} />

          <div className="btn-wrapper">
            <button
              onClick={handleConfirmBooking}
              className="confirm-btn"
              disabled={creating}
            >
              {creating ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
