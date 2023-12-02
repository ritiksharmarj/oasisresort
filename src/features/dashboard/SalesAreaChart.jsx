import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useThemeContext } from '../../hooks/useThemeContext';

function SalesAreaChart({ bookings, numDays }) {
  const { isDarkMode } = useThemeContext();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <div className="container--area-chart col-span-full rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
      <div className="pb-6 text-xl font-semibold">
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &ndash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </div>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.totalSales.fill}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={colors.totalSales.fill}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="extrasSales" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.extrasSales.fill}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={colors.extrasSales.fill}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill="url(#totalSales)"
            fillOpacity={1}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill="url(#extrasSales)"
            fillOpacity={1}
            name="Extra sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesAreaChart;
