import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../../services/apiAuth';
import toast from 'react-hot-toast';
import { useCurrentUser } from './useCurrentUser';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (data) => {
      if (isAdmin) updateCurrentUser(data);
      else throw new Error("You don't have permission.");
    },
    onSuccess: (data) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
