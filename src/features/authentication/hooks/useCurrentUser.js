import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiAuth';

export function useCurrentUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';
  const isAdmin = user?.user_metadata.user_role === 'admin';

  return { isLoading, user, isAuthenticated, isAdmin };
}
