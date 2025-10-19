import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const SeatSelection = ({ tripId, onSelectSeats }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/booking/trips/${tripId}/seats`);
        setBookedSeats(data.bookedSeats);
      } catch (err) {
        console.error("Error fetching booked seats:", err.response?.data || err);
      }
    };

    if (tripId) fetchBookedSeats();
  }, [tripId]);

  useEffect(() => {
    const layout = [
      ["A1", "A2", "A3", "A4", "A5", "A6"],
      ["B1", "B2", "B3", "B4", "B5", "B6"],
      ["C1", "C2", "C3", "C4", "C5", "C6"],
      ["D1", "D2", "D3", "D4", "D5", "D6"],
      ["E1", "E2", "E3", "E4", "E5", "E6"],
      ["F1", "F2", "F3", "F4", "F5", "F6"],
    ];

    const formatted = layout.map((row) =>
      row.map((seat) => ({
        id: seat,
        booked: bookedSeats?.includes(seat),
      }))
    );

    setSeats(formatted);
  }, [bookedSeats]);

  const handleSeatClick = (seatId) => {
    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId];
    
    setSelectedSeats(newSelectedSeats);
    onSelectSeats(newSelectedSeats);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      <h2 className="text-lg font-semibold mb-4">Select Your Seat</h2>

      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="inline-block">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2 space-x-2">
              {row.map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <button
                    key={seat.id}
                    onClick={() => !seat.booked && handleSeatClick(seat.id)}
                    disabled={seat.booked}
                    className={`w-10 h-10 text-sm font-medium rounded-md transition ${
                      seat.booked
                        ? "bg-red-200 text-gray-700 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-blue-100"
                    }`}
                  >
                    {seat.id}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Selected Seats</h2>
        <p className="text-gray-700">
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
};

export default SeatSelection;
