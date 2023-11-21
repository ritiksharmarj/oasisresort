import BookingTable from '../features/bookings/BookingTable';

function Bookings() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">All bookings</span>

        <div className="flex items-center gap-2">{/* operations */}</div>
      </div>

      <BookingTable />
    </>
  );
}

export default Bookings;
