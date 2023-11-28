import { useNavigate } from 'react-router-dom';
import { format, isToday, parseISO } from 'date-fns';
import {
  ArrowRight,
  DotsThreeOutline,
  DownloadSimple,
  Eye,
  Trash,
  UploadSimple,
} from '@phosphor-icons/react';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import DropdownMenu from '../../components/ui/DropdownMenu';
import Modal from '../../components/ui/Modal';
import { useCheckout } from '../checkInOut/hooks/useCheckout';
import ConfirmDelete from '../../components/ui/ConfirmDelete';
import { useDeleteBooking } from './hooks/useDeleteBooking';

function BookingRow({ booking }) {
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

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

              {/* Check out */}
              {status === 'checked-in' && (
                <DropdownMenu.Item
                  icon={<UploadSimple size={20} />}
                  onClick={() => checkout(bookingId)}
                  disabled={isCheckingOut}
                >
                  Check out
                </DropdownMenu.Item>
              )}

              {/* Delete booking */}
              <Modal.Toggle toggleName="delete-booking">
                <DropdownMenu.Item icon={<Trash size={20} />}>
                  Delete booking
                </DropdownMenu.Item>
              </Modal.Toggle>
            </DropdownMenu.Content>

            <Modal.Window windowName="delete-booking">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>
          </Modal>
        </DropdownMenu>
      </Table.Cell>
    </Table.Row>
  );
}

export default BookingRow;
