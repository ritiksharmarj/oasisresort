import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: (data) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
