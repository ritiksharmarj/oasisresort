import Filter from '../../components/ui/Filter';
import SortBy from '../../components/ui/SortBy';

function BookingTableOperations() {
  return (
    <div className="flex items-center gap-2">
      <Filter
        searchParameterName="status"
        options={[
          { value: 'all', label: 'All bookings' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        searchParameterName="sortBy"
        options={[
          { value: 'startDate-desc', label: 'Sort by date (recent first)' },
          { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'totalPrice-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </div>
  );
}

export default BookingTableOperations;
