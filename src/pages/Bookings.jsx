import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Bookings() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">All bookings</span>

        <BookingTableOperations />
      </div>

      <BookingTable />
    </>
  );
}

export default Bookings;
