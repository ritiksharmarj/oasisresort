import { useNavigate } from 'react-router-dom';
import { Gear, Moon } from '@phosphor-icons/react';

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate('/settings')}
        className="rounded-md p-2 text-brand-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <Gear size={20} />
      </button>

      <button className="rounded-md p-2 text-brand-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed">
        <Moon size={20} />
      </button>
    </>
  );
}

export default HeaderMenu;
