import { Link } from 'react-router-dom';
import MainNav from './MainNav';
import { useThemeContext } from '../hooks/useThemeContext';

function Sidebar() {
  const { isDarkMode } = useThemeContext();

  const src = isDarkMode ? '/logo-light.svg' : '/logo-dark.svg';

  return (
    <div className="row-span-full flex flex-col gap-12 border-r border-r-gray-100 bg-gray-0 p-10">
      <Link to="/">
        <img src={src} alt="Oasis Resort Logo" />
      </Link>

      <MainNav />
    </div>
  );
}

export default Sidebar;
