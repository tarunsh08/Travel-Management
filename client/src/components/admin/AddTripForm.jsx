import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useTrips } from "../../context/TripContext";

const AddTripForm = () => {
  const { fetchTrips } = useTrips();
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    totalSeats: "",
    availableSeats: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/trip/trips", form, { withCredentials: true });
      fetchTrips();
      setForm({ from: "", to: "", date: "", time: "", totalSeats: "", availableSeats: "", price: "" });
      alert("Trip added successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error adding trip");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-lg font-semibold mb-4">Add New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["from", "to", "date", "time", "totalSeats", "availableSeats", "price"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === "price" || field === "totalSeats" ? "number" : field === "date" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Trip
        </button>
      </form>
    </div>
  );
};

export default AddTripForm;
