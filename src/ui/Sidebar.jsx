import { Link } from 'react-router-dom';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <div className="border-r-gray-100 bg-gray-0 row-span-full flex flex-col gap-12 border-r p-10">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>

      <MainNav />
    </div>
  );
}

export default Sidebar;
