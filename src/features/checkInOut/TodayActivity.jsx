import Spinner from '../../components/ui/Spinner';
import TodayActivityItem from './TodayActivityItem';
import { useTodayActivity } from './hooks/useTodayActivity';

function TodayActivity() {
  const { todayActivities, isLoading } = useTodayActivity();

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  // If there is no booking data to show
  if (!todayActivities) return <div>No activity today...</div>;

  return (
    <div className="col-span-2 col-start-1 flex flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
      <div className="pb-6 text-xl font-semibold">Today activity</div>

      <div className="divide-y divide-gray-200 overflow-y-auto overflow-x-hidden">
        {todayActivities.map((activity) => (
          <TodayActivityItem activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
}

export default TodayActivity;
