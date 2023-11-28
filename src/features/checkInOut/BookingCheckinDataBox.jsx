import { useEffect, useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckin } from './hooks/useCheckin';
import { useSettings } from '../settings/hooks/useSettings';
import Spinner from '../../components/ui/Spinner';
import { useBookingDetail } from '../bookings/hooks/useBookingDetail';
import BookingDataBox from '../bookings/bookingDetails/BookingDataBox';
import { formatCurrency } from '../../utils/helpers';

function BookingCheckinDataBox() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBookingDetail();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  // Mark check to checkbox if booking is already paid
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings)
    return <Spinner className="mx-auto h-6 w-6" />;

  // If there is no booking data to show
  if (!booking) return <div>No data to show at the moment.</div>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // Calculate total breakfast price
  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
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

      {/* Add breakfast option if there is no */}
      {!hasBreakfast && (
        <div className="mt-10 flex items-center gap-2 overflow-hidden rounded-md border border-gray-200 bg-gray-0 px-10 py-5 shadow-sm">
          <input
            type="checkbox"
            name="breakfast"
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false); // Set to false if already checked before
            }}
            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
          />
          <label htmlFor="breakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </label>
        </div>
      )}

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
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
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
