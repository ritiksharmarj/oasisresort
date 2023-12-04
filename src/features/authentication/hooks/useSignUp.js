import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../../services/apiAuth';
import toast from 'react-hot-toast';
import { useCurrentUser } from './useCurrentUser';

export function useSignUp() {
  const { isAdmin } = useCurrentUser();

  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: (data) => {
      if (isAdmin) signUpApi(data);
      else throw new Error("You don't have permission.");
    },
    onSuccess: () => {
      toast.success('Please verify email address for Oasis Resort');
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isLoading };
}
