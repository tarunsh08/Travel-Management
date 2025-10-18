import { createContext, useEffect, useContext, useState } from "react";
import { getAllTrips, getTripById } from "../api/trips";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trip, setTrip] = useState(null);

    const fetchTrips = async () => {
        try {
            const data = await getAllTrips();
            setTrips(data.trips || []);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchTripById = async (id) => {
        try {
            const data = await getTripById(id);
            setTrip(data.trip);
        } catch (error) {
            console.error("Error fetching trip:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <TripContext.Provider value={{ trips, loading, fetchTrips, trip, fetchTripById }}>
            {children}
        </TripContext.Provider>
    );
}


export const useTrips = () => useContext(TripContext);