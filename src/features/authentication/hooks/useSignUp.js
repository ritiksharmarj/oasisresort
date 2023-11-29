import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: (data) => signUpApi(data),
    onSuccess: () => {
      toast.success('Please verify email address for Oasis Resort');
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isLoading };
}
