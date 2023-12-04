import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAdmin } = useCurrentUser();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      if (isAdmin)
        updateBooking(bookingId, {
          status: 'checked-in',
          isPaid: true,
          ...breakfast,
        });
      else throw new Error("You don't have permission.");
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      navigate('/bookings');
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkin, isCheckingIn };
}
