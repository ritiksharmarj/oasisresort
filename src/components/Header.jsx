import { SignOut, User } from '@phosphor-icons/react';
import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';
import DropdownMenu from './ui/DropdownMenu';
import { useLogout } from '../features/authentication/hooks/useLogout';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-1 border-b border-b-gray-100 bg-gray-0 px-10 py-4">
      <HeaderMenu />

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenu.Toggle
          toggleName="user-menu"
          className="p-0 hover:bg-transparent"
        >
          <UserAvatar />
        </DropdownMenu.Toggle>

        <DropdownMenu.Content windowName="user-menu">
          <DropdownMenu.Item
            icon={<User size={20} />}
            onClick={() => navigate('/account')}
          >
            Profile
          </DropdownMenu.Item>

          {/* Logout */}
          <DropdownMenu.Item
            icon={<SignOut size={20} />}
            onClick={logout}
            disabled={isLoading}
            className="text-red-600 hover:bg-red-100"
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}

export default Header;
