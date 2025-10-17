import {Router} from 'express';
import { bookSeats, cancelBooking, getMyBooking, getMyBookings } from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/bookings', protect, bookSeats);
router.get('/my-bookings', protect, getMyBookings);
router.get('/my-bookings/:id', protect, getMyBooking);
router.delete('/my-bookings/:id/cancel', protect, cancelBooking);

export default router;