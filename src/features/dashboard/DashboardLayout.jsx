import { useRecentBookings } from './hooks/useRecentBookings';
import Spinner from '../../components/ui/Spinner';
import useRecentStays from './hooks/useRecentStays';
import Stats from './Stats';
import { useCabins } from '../cabins/hooks/useCabins';

function DashboardLayout() {
  const { bookings, isLoading: isLoadingStats } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingStats || isLoadingStays || isLoadingCabins)
    return <Spinner className="mx-auto h-6 w-6" />;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_340px_auto] gap-10">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
    </div>
  );
}

export default DashboardLayout;