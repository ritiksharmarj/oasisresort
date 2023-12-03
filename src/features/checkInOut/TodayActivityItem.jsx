import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import { useCheckout } from './hooks/useCheckout';

function TodayActivityItem({ activity }) {
  const { id: bookingId, status, guests, numNights } = activity;
  const { checkout, isCheckingOut } = useCheckout();

  const statusBadge = {
    unconfirmed: 'green',
    'checked-in': 'blue',
  };

  return (
    <div className="grid grid-cols-[110px_auto_200px] items-center py-2 text-sm">
      <div>
        <Badge variant={statusBadge[status]} className="w-[90px]">
          {status === 'unconfirmed' ? 'Arriving' : 'Departing'}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={guests.countryFlag}
          alt={guests.nationality}
          className="w-5 rounded-sm"
        />
        <span className="font-medium">{guests.name}</span>
      </div>

      <div className="flex items-center justify-end gap-4">
        <span>{numNights} nights</span>

        {status === 'unconfirmed' && (
          <Link
            to={`/checkin/${bookingId}`}
            className="flex w-[90px] items-center justify-center rounded-md bg-brand-600 px-2 py-1 text-xs font-medium uppercase text-brand-50 shadow-sm transition-all hover:bg-brand-700"
          >
            Check in
          </Link>
        )}
        {status === 'checked-in' && (
          <button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
            className="flex w-[90px] items-center justify-center rounded-md bg-brand-600 px-2 py-1 text-xs font-medium uppercase text-brand-50 shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200 disabled:opacity-50"
          >
            Check out
          </button>
        )}
      </div>
    </div>
  );
}

export default TodayActivityItem;
