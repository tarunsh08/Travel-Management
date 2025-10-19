import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    seats:{
        type: [String],
        required: true
    },
    bookingDate:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        default: "pending"
    }
})

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;