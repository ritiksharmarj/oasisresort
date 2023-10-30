import { NavLink } from 'react-router-dom';
import { Calendar, Gear, House, Users, Warehouse } from '@phosphor-icons/react';

function NavItem({ to, icon, label }) {
  return (
    <li className="main-nav__link">
      <NavLink
        to={to}
        className="group flex items-center gap-3 rounded-sm fill-grey-400 px-6 py-3 text-base font-medium text-grey-600 transition hover:bg-grey-100"
      >
        {icon}
        <span className="transition group-hover:text-grey-800">{label}</span>
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
