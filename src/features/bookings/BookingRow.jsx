import { format, isToday, parseISO } from 'date-fns';
import Table from '../../components/ui/Table';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { ArrowRight } from '@phosphor-icons/react';
import Badge from '../../components/ui/Badge';

function BookingRow({ booking }) {
  const {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    cabins: { cabinName },
    guests: { name: guestName, email: guestEmail },
  } = booking;

  const statusBadge = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Table.Cell className="font-semibold">
        <span>{cabinName}</span>
      </Table.Cell>

      <Table.Cell className="flex flex-col gap-1">
        <span>{guestName}</span>
        <span className="text-xs font-normal text-gray-500">{guestEmail}</span>
      </Table.Cell>

      <Table.Cell>
        <span className="flex items-center gap-1">
          {isToday(parseISO(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          <ArrowRight size={14} />
          {numNights} night stay
        </span>
        <span className="mt-1 text-xs font-normal text-gray-500">
          {format(parseISO(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(parseISO(endDate), 'MMM dd yyyy')}
        </span>
      </Table.Cell>

      <Table.Cell>
        <Badge variant={statusBadge[status]}>{status.replace('-', ' ')}</Badge>
      </Table.Cell>

      <Table.Cell className="font-semibold">
        <span>{formatCurrency(totalPrice)}</span>
      </Table.Cell>

      <Table.Cell></Table.Cell>
    </Table.Row>
  );
}

export default BookingRow;
