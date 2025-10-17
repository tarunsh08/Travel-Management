import {Router} from 'express';
import { createTrip, deleteTrip, getTripById, getTrips, updateTrip } from '../controllers/trip.controller.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();

router.get('/trips', getTrips);
router.get('/trips/:id', getTripById);
router.post('/trips', protect, adminOnly, createTrip);
router.patch('/trips/:id', protect, adminOnly, updateTrip);
router.delete('/trips/:id', protect, adminOnly, deleteTrip);

export default router;
