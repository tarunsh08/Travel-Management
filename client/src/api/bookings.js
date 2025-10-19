import axiosInstance from "./axiosInstance";

export const getBookedSeats = async (tripId) => {
  const res = await axiosInstance.get(`/api/booking/trips/${tripId}/seats`);
  return res.data;
};

export const createBooking = async (tripId, selectedSeats) => {
  const res = await axiosInstance.post("api/booking/bookings", {
    tripId,
    selectedSeats,
  });
  return res.data;
};
