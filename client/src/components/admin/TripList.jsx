import TripCard from "./TripCard";

const TripList = ({ trips }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Manage Trips</h2>
      {trips.length === 0 ? (
        <p>No trips added yet.</p>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;
