import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ data, id }) => {
      if (isAdmin) createEditCabin(data, id);
      else throw new Error("You don't have permission.");
    },
    onSuccess: () => {
      toast.success('Cabin successfully edited.');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
