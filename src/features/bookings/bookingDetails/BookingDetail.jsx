import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { useBookingDetail } from '../hooks/useBookingDetail';
import Spinner from '../../../components/ui/Spinner';
import Badge from '../../../components/ui/Badge';
import BookingDataBox from './BookingDataBox';
import { ArrowLeft } from '@phosphor-icons/react';

function BookingDetail() {
  const { booking, isLoading } = useBookingDetail();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  // If there is no booking data to show
  if (!booking) return <div>No data to show at the moment.</div>;

  const { id: bookingId, status } = booking;

  const statusBadge = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-3xl font-semibold">Booking #{bookingId}</span>
          <Badge variant={statusBadge[status]}>
            {status.replace('-', ' ')}
          </Badge>
        </div>

        <button
          onClick={moveBack}
          className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-gray-700"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="mt-10 flex items-center justify-end gap-2">
        {status === 'unconfirmed' && (
          <button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 text-sm font-medium transition-colors hover:bg-gray-200"
          >
            Check in
          </button>
        )}

        <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-red-100 shadow-sm transition-all hover:bg-red-700 disabled:bg-red-200">
          Delete booking
        </button>
      </div>
    </>
  );
}

export default BookingDetail;
