import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (data) => {
      if (isAdmin) createEditCabin(data);
      else throw new Error("You don't have permission.");
    },
    onSuccess: () => {
      toast.success('Cabin successfully created.');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
}
