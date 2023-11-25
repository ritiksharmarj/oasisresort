import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue,
        };

  // SORT
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}
