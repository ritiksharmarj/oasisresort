import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../../services/apiCabins';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: (cabinId) => {
      if (isAdmin) deleteCabinApi(cabinId);
      else throw new Error("You don't have permission.");
    },
    onSuccess: () => {
      toast.success('Cabin successfully deleted.');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabin, isDeleting };
}
