import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../../services/apiBookings';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      if (isAdmin)
        updateBooking(bookingId, {
          status: 'checked-out',
        });
      else throw new Error("You don't have permission.");
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out.`);

      queryClient.invalidateQueries({ stale: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isCheckingOut };
}
