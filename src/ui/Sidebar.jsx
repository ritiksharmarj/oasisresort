import { Link } from 'react-router-dom';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <div className="row-span-full flex flex-col gap-12 border-r border-r-grey-100 bg-grey-0 p-10">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>

      <MainNav />
    </div>
  );
}

export default Sidebar;
