import { useNavigate } from 'react-router-dom';
import { Gear, Moon, Sun } from '@phosphor-icons/react';
import { useThemeContext } from '../hooks/useThemeContext';

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <>
      <button
        onClick={() => navigate('/settings')}
        className="rounded-md p-2 text-brand-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <Gear size={20} />
      </button>

      {/* Theme - light & dark */}
      <button
        onClick={toggleDarkMode}
        className="rounded-md p-2 text-brand-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </>
  );
}

export default HeaderMenu;
