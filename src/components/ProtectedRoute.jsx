import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../features/authentication/hooks/useCurrentUser';
import { useEffect } from 'react';
import Spinner from './ui/Spinner';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useCurrentUser();

  // If current user is not authenticated and data received undefined, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, navigate, isLoading]);

  // Show spinner while validating current user
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="mx-auto h-6 w-6" />
      </div>
    );

  // If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
