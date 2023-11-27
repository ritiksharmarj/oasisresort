import { ArrowLeft } from '@phosphor-icons/react';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { useBookingDetail } from '../hooks/useBookingDetail';
import Spinner from '../../../components/ui/Spinner';
import Badge from '../../../components/ui/Badge';
import BookingDataBox from './BookingDataBox';

function BookingDetail() {
  const { booking, isLoading } = useBookingDetail();
  const moveBack = useMoveBack();

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

      <BookingDataBox />
    </>
  );
}

export default BookingDetail;
