import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();
  const navigate = useNavigate();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId) => {
      if (isAdmin) deleteBookingApi(bookingId);
      else throw new Error("You don't have permission.");
    },
    onSuccess: () => {
      toast.success('Booking successfully deleted.');

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      navigate('/bookings');
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking, isDeleting };
}
