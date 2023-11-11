import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: (cabinId) => deleteCabinApi(cabinId),
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
