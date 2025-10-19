import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Booking from '../screens/Booking'
import Payment from '../screens/Payment'
import Confirmation from '../screens/Confirmation'
import FlightTicket from '../screens/FlightTicket'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation/:id" element={<Confirmation />} />
      <Route path="/flight-ticket" element={<FlightTicket />} />
    </Routes>
  )
}

export default AppRoutes