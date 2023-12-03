import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../../services/apiBookings';

export function useTodayActivity() {
  const { data: todayActivities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['todayActivity'],
  });

  return { todayActivities, isLoading };
}
