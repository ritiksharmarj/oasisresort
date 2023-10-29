import { NavLink } from 'react-router-dom';
import { Calendar, Gear, House, Users, Warehouse } from '@phosphor-icons/react';

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li className="main-nav__link">
          <NavLink
            to="/dashboard"
            className="group flex items-center gap-3 rounded-sm px-6 py-3 text-base font-medium text-grey-600 transition hover:bg-grey-100 active:bg-grey-100"
          >
            <House
              size={24}
              className="text-grey-400 transition group-hover:text-brand-600 group-active:text-brand-600"
            />
            <span className="transition group-hover:text-grey-800 group-active:text-grey-800">
              Home
            </span>
          </NavLink>
        </li>

        <li className="main-nav__link">
          <NavLink
            to="/bookings"
            className="group flex items-center gap-3 rounded-sm px-6 py-3 text-base font-medium text-grey-600 transition hover:bg-grey-100 active:bg-grey-100"
          >
            <Calendar
              size={24}
              className="text-grey-400 transition group-hover:text-brand-600 group-active:text-brand-600"
            />
            <span className="transition group-hover:text-grey-800 group-active:text-grey-800">
              Bookings
            </span>
          </NavLink>
        </li>

        <li className="main-nav__link">
          <NavLink
            to="/cabins"
            className="group flex items-center gap-3 rounded-sm px-6 py-3 text-base font-medium text-grey-600 transition hover:bg-grey-100 active:bg-grey-100"
          >
            <Warehouse
              size={24}
              className="text-grey-400 transition group-hover:text-brand-600 group-active:text-brand-600"
            />
            <span className="transition group-hover:text-grey-800 group-active:text-grey-800">
              Cabins
            </span>
          </NavLink>
        </li>

        <li className="main-nav__link">
          <NavLink
            to="/users"
            className="group flex items-center gap-3 rounded-sm px-6 py-3 text-base font-medium text-grey-600 transition hover:bg-grey-100 active:bg-grey-100"
          >
            <Users
              size={24}
              className="text-grey-400 transition group-hover:text-brand-600 group-active:text-brand-600"
            />
            <span className="transition group-hover:text-grey-800 group-active:text-grey-800">
              Users
            </span>
          </NavLink>
        </li>

        <li className="main-nav__link">
          <NavLink
            to="/settings"
            className="group flex items-center gap-3 rounded-sm px-6 py-3 text-base font-medium text-grey-600 transition hover:bg-grey-100 active:bg-grey-100"
          >
            <Gear
              size={24}
              className="text-grey-400 transition group-hover:text-brand-600 group-active:text-brand-600"
            />
            <span className="transition group-hover:text-grey-800 group-active:text-grey-800">
              Settings
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
