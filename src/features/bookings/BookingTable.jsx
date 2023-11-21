import { useBookings } from './hooks/useBookings';
import Table from '../../components/ui/Table';
import BookingRow from './BookingRow';
import Spinner from '../../components/ui/Spinner';

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  // If there is no bookings data to show
  if (!bookings.length) return <div>No data to show at the moment.</div>;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Cabin</Table.Head>
          <Table.Head>Guest</Table.Head>
          <Table.Head>Dates</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {bookings.map((booking) => (
          <BookingRow booking={booking} key={booking.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default BookingTable;
