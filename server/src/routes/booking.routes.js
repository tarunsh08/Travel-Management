import {Router} from 'express';
import { bookSeats, cancelBooking, getMyBooking, getMyBookings, getBookedSeats, createBooking } from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/bookings', protect, bookSeats);
router.post('/create-bookings', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/my-bookings/:id', protect, getMyBooking);
router.delete('/my-bookings/:id/cancel', protect, cancelBooking);
router.get('/trips/:tripId/seats', protect, getBookedSeats);

export default router;