import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Booking from '../screens/Booking'
import Payment from '../screens/Payment'
import Confirmation from '../screens/Confirmation'
import FlightTicket from '../screens/FlightTicket'
import ProtectedAdmin from '../config/ProtectAdmin'
import AdminDash from '../screens/admin/AdminDash'
import Profile from '../screens/Profile'
import MyBookings from '../screens/MyBookings'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/confirmation/:id" element={<Confirmation />} />
      <Route path="/flight-ticket" element={<FlightTicket />} />
      <Route path="/admin" element={<ProtectedAdmin>
        <AdminDash />
      </ProtectedAdmin>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  )
}

export default AppRoutes