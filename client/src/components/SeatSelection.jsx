import { useState, useEffect } from "react";

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Example fetch function (replace later with your API call)
  useEffect(() => {
    // Simulate fetching seat layout from backend
    const fetchedSeats = [
      ["A1", "A2", "A3", "A4", "A5", "A6"],
      ["B1", "B2", "B3", "B4", "B5", "B6"],
      ["C1", "C2", "C3", "C4", "C5", "C6"],
      ["D1", "D2", "D3", "D4", "D5", "D6"],
      ["E1", "E2", "E3", "E4", "E5", "E6"],
      ["F1", "F2", "F3", "F4", "F5", "F6"],
    ];

    // Example of booked seats fetched from backend
    const booked = ["A2", "B3", "C2", "D1", "D3", "E1", "E2", "F2", "F3", "F4", "F6", "C6", "B5", "D6"];

    const formatted = fetchedSeats.map((row) =>
      row.map((seat) => ({
        id: seat,
        booked: booked.includes(seat),
      }))
    );

    setSeats(formatted);
  }, []);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">Select Your Seat</h2>

        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="font-medium mb-4">Deluxe Cabin</h3>

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

          <div className="flex justify-center mt-6 space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-gray-200 border rounded"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-red-200 border rounded"></span>
              <span>Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-blue-600 border rounded"></span>
              <span className="text-gray-700">Selected</span>
            </div>
          </div>
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
