import { format, parseISO, isToday } from 'date-fns';
import { formatCurrency, formatDistanceFromNow } from '../../../utils/helpers';
import {
  ChatDots,
  CheckCircle,
  CurrencyCircleDollar,
  Warehouse,
} from '@phosphor-icons/react';

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { name: guestName, email, nationality, countryFlag, nationalId },
    cabins: { cabinName },
  } = booking;

  return (
    <div className="flex min-w-full flex-col overflow-hidden rounded-md bg-gray-0 shadow-sm">
      <div className="flex items-center justify-between bg-brand-500 px-10 py-5 text-xl font-medium text-brand-50">
        <div className="flex items-center gap-2">
          <Warehouse size={32} />
          <span>
            {numNights} nights in Cabin {cabinName}
          </span>
        </div>

        <span>
          {format(parseISO(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(parseISO(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(parseISO(endDate), 'EEE, MMM dd yyyy')}
        </span>
      </div>

      <div className="flex flex-col rounded-md rounded-t-none border border-t-0 border-gray-200">
        <div className="flex flex-col px-10 pb-3 pt-8">
          <div className="mb-6 flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-2 font-medium text-gray-700">
              {countryFlag && (
                <img src={countryFlag} alt={nationality} width={24} />
              )}
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
            </span>
            <span>&bull;</span>
            <span className="lowercase">{email}</span>
            <span>&bull;</span>
            <span>National ID {nationalId}</span>
          </div>

          {observations && (
            <div className="mb-6 flex items-center gap-4">
              <span className="flex items-center gap-2 text-base font-medium">
                <ChatDots size={24} className="text-brand-600" />
                Observations
              </span>
              <span>{observations}</span>
            </div>
          )}

          <div className="mb-6 flex items-center gap-4">
            <span className="flex items-center gap-2 text-base font-medium">
              <CheckCircle size={24} className="text-brand-600" />
              Breakfast included?
            </span>
            <span>{hasBreakfast ? 'Yes' : 'No'}</span>
          </div>

          <div
            data-state={isPaid ? 'paid' : 'unpaid'}
            className="flex items-center justify-between rounded-md bg-yellow-100 px-8 py-6 text-yellow-700 data-[state=paid]:bg-green-100 data-[state=paid]:text-green-700"
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-medium">
                <CurrencyCircleDollar size={24} />
                Total price
              </span>
              <span>
                {formatCurrency(totalPrice)}{' '}
                {hasBreakfast &&
                  `(${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                    extrasPrice,
                  )} breakfast)`}
              </span>
            </div>

            <span className="font-semibold uppercase">
              {isPaid ? 'Paid' : 'Will pay at property'}
            </span>
          </div>
        </div>

        <div className="px-10 py-4 text-right text-sm text-gray-500">
          <span>
            Booked {format(parseISO(created_at), 'EEE, MMM dd yyyy, p')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookingDataBox;
