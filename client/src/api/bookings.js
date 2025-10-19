import axiosInstance from "./axiosInstance";

export const getBookedSeats = async (tripId) => {
  const res = await axiosInstance.get(`/api/booking/trips/${tripId}/seats`);
  return res.data;
};

export const createBooking = async (bookingData) => {
  const res = await axiosInstance.post("/api/booking/create-bookings", bookingData);
  return res.data;
};

export const getBookings = async () => {
  const res = await axiosInstance.get("/api/booking/my-bookings");
  return res.data;
};