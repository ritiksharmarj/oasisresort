import { useEffect, useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckin } from './hooks/useCheckin';
import Spinner from '../../components/ui/Spinner';
import { useBookingDetail } from '../bookings/hooks/useBookingDetail';
import BookingDataBox from '../bookings/bookingDetails/BookingDataBox';
import { formatCurrency } from '../../utils/helpers';

function BookingCheckinDataBox() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBookingDetail();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  // Mark check to checkbox if booking is already paid
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  // If there is no booking data to show
  if (!booking) return <div>No data to show at the moment.</div>;

  const { id: bookingId, guests, totalPrice } = booking;

  function handleCheckin() {
    if (confirmPaid) checkin(bookingId);
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">
          Check in booking #{bookingId}
        </span>
        <button
          onClick={moveBack}
          className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-gray-700"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <BookingDataBox booking={booking} />

      {/* Confirm booking */}
      <div className="mt-10 flex items-center gap-2 overflow-hidden rounded-md border border-gray-200 bg-gray-0 px-10 py-5 shadow-sm">
        <input
          type="checkbox"
          name="confirm"
          id="confirm"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
        />
        <label htmlFor="confirm">
          I confirm that {guests.name} has paid the total amount of{' '}
          {formatCurrency(totalPrice)}
        </label>
      </div>

      {/* Action buttons */}
      <div className="mt-10 flex items-center justify-end gap-2">
        <button
          onClick={moveBack}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 text-sm font-medium transition-colors hover:bg-gray-200"
        >
          Back
        </button>

        <button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
          className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200"
        >
          Checkin booking #{bookingId}
        </button>
      </div>
    </>
  );
}

export default BookingCheckinDataBox;
