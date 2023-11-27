import { useQuery } from '@tanstack/react-query';
import { getBookingDetail } from '../../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBookingDetail() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingDetail(bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
}
