import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import corsOptions from './config/corsOptions.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/booking', bookingRoutes);

export default app;