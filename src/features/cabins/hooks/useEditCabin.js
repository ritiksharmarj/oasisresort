import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id),
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
