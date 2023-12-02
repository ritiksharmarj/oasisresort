import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';
import { getBookingsAfterDate } from '../../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('daysForStats')
    ? 7
    : Number(searchParams.get('daysForStats'));

  const queryDate = subDays(
    new Date().setUTCHours(0, 0, 0, 0),
    numDays,
  ).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', { statsFromDate: queryDate }],
  });

  return { bookings, isLoading };
}
