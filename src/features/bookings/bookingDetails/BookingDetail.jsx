import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { useBookingDetail } from '../hooks/useBookingDetail';
import Spinner from '../../../components/ui/Spinner';
import Badge from '../../../components/ui/Badge';
import BookingDataBox from './BookingDataBox';
import { ArrowLeft } from '@phosphor-icons/react';
import { useCheckout } from '../../checkInOut/hooks/useCheckout';
import Modal from '../../../components/ui/Modal';
import ConfirmDelete from '../../../components/ui/ConfirmDelete';
import { useDeleteBooking } from '../hooks/useDeleteBooking';

function BookingDetail() {
  const { booking, isLoading } = useBookingDetail();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

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

        {status === 'checked-in' && (
          <button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 text-sm font-medium transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check out
          </button>
        )}

        <Modal>
          <Modal.Toggle toggleName="delete-booking">
            <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-red-100 shadow-sm transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-200">
              Delete booking
            </button>
          </Modal.Toggle>

          <Modal.Window windowName="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default BookingDetail;
