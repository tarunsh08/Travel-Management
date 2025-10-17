import Trip from "../models/trip.model.js";

export const createTrip = async (req, res) => {
    try {
        const { from, to, date, time, price, totalSeats, availableSeats } = req.body;
        if(!from || !to || !date || !time || !price || !totalSeats || !availableSeats) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const trip = await Trip.create({
            from,
            to,
            date,
            time,
            price,
            totalSeats,
            availableSeats
        });

        return res.status(201).json({
            message: "Trip created successfully",
            trip
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getTrips = async (req, res) => {
    try {
        const { from, to, date, page = 1, limit = 20 } = req.query;
        
        const filter = {};

        if(from){
            filter.from = new RegExp(`^${from}`, "i");
        }

        if(to){
            filter.to = new RegExp(`^${to}`, "i");
        }

        if(date){
            filter.date = date;
        }

        const trips = await Trip.find(filter).skip((page - 1) * limit).limit(parseInt(limit));

        return res.status(200).json({
            message: "Trips fetched successfully",
            trips
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id);
        if(!trip){
            return res.status(404).json({
                message: "Trip not found"
            });
        }
        return res.status(200).json({
            message: "Trip fetched successfully",
            trip
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
        if(!trip){
            return res.status(404).json({
                message: "Trip not found"
            });
        }
        return res.status(200).json({
            message: "Trip updated successfully",
            trip
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndDelete(id);
        if(!trip){
            return res.status(404).json({
                message: "Trip not found"
            });
        }
        return res.status(200).json({
            message: "Trip deleted successfully",
            trip
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}