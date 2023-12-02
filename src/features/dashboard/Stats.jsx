import {
  Briefcase,
  Calendar,
  ChartBar,
  CurrencyCircleDollar,
} from '@phosphor-icons/react';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // Calc total bookings
  const numBookings = bookings.length;

  // Calc total bookings price
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // Calc total check ins
  const checkins = confirmedStays.length;

  // All checked in nights / all available nights (num days * num cabins)
  const occupationRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  const allStats = [
    {
      title: 'Bookings',
      color: 'blue',
      icon: <Briefcase size={32} />,
      value: numBookings,
    },
    {
      title: 'Sales',
      color: 'green',
      icon: <CurrencyCircleDollar size={32} />,
      value: formatCurrency(sales),
    },
    {
      title: 'Check ins',
      color: 'indigo',
      icon: <Calendar size={32} />,
      value: checkins,
    },
    {
      title: 'Occupancy rate',
      color: 'yellow',
      icon: <ChartBar size={32} />,
      value: Math.round(occupationRate * 100) + '%',
    },
  ];

  return (
    <>
      {allStats.map((stat) => (
        <div
          key={stat.title}
          className="grid grid-cols-[64px_1fr] grid-rows-[auto_auto] items-center gap-x-4 gap-y-1 overflow-hidden rounded-md border border-gray-200 bg-gray-0 p-4 shadow-sm"
        >
          <div
            className="row-span-full flex aspect-square items-center justify-center rounded-full"
            style={{
              backgroundColor: `rgb(var(--color-${stat.color}-100))`,
              color: `rgb(var(--color-${stat.color}-700))`,
            }}
          >
            {stat.icon}
          </div>
          <span className="text-sm font-semibold uppercase text-gray-500">
            {stat.title}
          </span>
          <span className="text-2xl font-medium">{stat.value}</span>
        </div>
      ))}
    </>
  );
}

export default Stats;
