import Trip from "../models/trip.model.js";
import Booking from "../models/booking.model.js";
import mongoose from "mongoose";

export const bookSeats = async (req, res) => {
    try {
        const { tripId, seats } = req.body;
        const userId = req.user._id;

        if (!Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({
                message: "No seats selected"
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        const trip = await Trip.findById(tripId).session(session);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        const intersection = seats.filter(s => trip.bookedSeats.includes(s));
        if (intersection.length) {
            return res.status(400).json({
                message: `Seats already booked: ${intersection.join(", ")}`
            });
        }

        trip.bookedSeats.push(...seats);
        await trip.save({ session });

        const booking = await Booking.create(
            [
                {
                    user: userId,
                    trip: tripId,
                    seats,
                    bookingDate: new Date(),
                    status: "confirmed",
                    price: trip.price * seats.length
                }
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            message: "Seats booked successfully",
            booking
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}