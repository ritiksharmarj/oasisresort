import { NavLink } from 'react-router-dom';
import { Calendar, Gear, House, Users, Warehouse } from '@phosphor-icons/react';

function NavItem({ to, icon, label }) {
  return (
    <li className="main-nav__link">
      <NavLink
        to={to}
        className="group flex items-center gap-3 rounded-md px-6 py-3 text-base font-medium text-gray-600 transition-all hover:bg-gray-100"
      >
        {icon}
        <span className="transition-all group-hover:text-gray-800">
          {label}
        </span>
      </NavLink>
    </li>
  );
}

function MainNav() {
  const navItems = [
    { to: '/dashboard', icon: <House />, label: 'Home' },
    { to: '/bookings', icon: <Calendar />, label: 'Bookings' },
    { to: '/cabins', icon: <Warehouse />, label: 'Cabins' },
    { to: '/users', icon: <Users />, label: 'Users' },
    { to: '/settings', icon: <Gear />, label: 'Settings' },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
