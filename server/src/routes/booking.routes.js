import {Router} from 'express';
import { bookSeats } from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/bookings', protect, bookSeats);

export default router;