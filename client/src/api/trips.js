import axiosInstance from "./axiosInstance";

export const getAllTrips = async () => {
    const res = await axiosInstance.get("/api/trip/trips");
    return res.data;
}

export const getTripById = async (id) => {
    const res = await axiosInstance.get(`/api/trip/trips/${id}`);
    return res.data;
}
