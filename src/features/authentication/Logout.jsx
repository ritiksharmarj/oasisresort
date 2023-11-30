import { SignOut } from '@phosphor-icons/react';
import { useLogout } from './hooks/useLogout';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <div>
      <button
        onClick={logout}
        disabled={isLoading}
        className="rounded-md p-2 text-brand-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <SignOut size={20} />
      </button>
    </div>
  );
}

export default Logout;
