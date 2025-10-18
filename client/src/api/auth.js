import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
    const res = await axiosInstance.post("/api/auth/v1/register", userData)
    return res.data
}

export const loginUser = async (userData) => {
    const res = await axiosInstance.post("/api/auth/v1/login", userData)
    return res.data
}

export const logoutUser = async () => {
    const res = await axiosInstance.post("/api/auth/v1/logout")
    return res.data
}

export const getUserProfile = async () => {
    const res = await axiosInstance.get("/api/user/v1/profile")
    return res.data
}
