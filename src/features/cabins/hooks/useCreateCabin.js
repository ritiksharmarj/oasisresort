import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (data) => createEditCabin(data),
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
