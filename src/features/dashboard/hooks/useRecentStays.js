import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../../services/apiBookings';

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('daysForStats')
    ? 7
    : Number(searchParams.get('daysForStats'));

  const queryDate = subDays(
    new Date().setUTCHours(0, 0, 0, 0),
    numDays,
  ).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', { staysFromDate: queryDate }],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  return { stays, isLoading, confirmedStays, numDays };
}
