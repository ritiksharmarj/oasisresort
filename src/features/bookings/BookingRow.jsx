import { format, isToday, parseISO } from 'date-fns';
import Table from '../../components/ui/Table';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import {
  ArrowRight,
  DotsThreeOutline,
  DownloadSimple,
  Eye,
} from '@phosphor-icons/react';
import Badge from '../../components/ui/Badge';
import DropdownMenu from '../../components/ui/DropdownMenu';
import Modal from '../../components/ui/Modal';
import { useNavigate } from 'react-router-dom';

function BookingRow({ booking }) {
  const navigate = useNavigate();

  const {
    id: bookingId,
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

      <Table.Cell>
        <DropdownMenu>
          <Modal>
            <DropdownMenu.Toggle toggleName={bookingId}>
              <DotsThreeOutline size={20} weight="fill" />
            </DropdownMenu.Toggle>

            <DropdownMenu.Content windowName={bookingId}>
              {/* See details */}
              <DropdownMenu.Item
                icon={<Eye size={20} />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </DropdownMenu.Item>

              {/* Check in */}
              {status === 'unconfirmed' && (
                <DropdownMenu.Item
                  icon={<DownloadSimple size={20} />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </Modal>
        </DropdownMenu>
      </Table.Cell>
    </Table.Row>
  );
}

export default BookingRow;
