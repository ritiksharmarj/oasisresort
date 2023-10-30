import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { Spinner } from '../../ui/Spinner';
import CabinRow from './CabinRow';

function CabinTable() {
  // React Query: Queries
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-full overflow-hidden rounded-md border border-grey-200 shadow-sm">
        <table className="min-w-full divide-y divide-grey-100 bg-grey-0 text-left text-sm font-medium">
          <thead className="bg-grey-100 uppercase text-grey-600">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Cabin Image
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Cabin
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Capacity
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Price
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Discount
              </th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-grey-100">
            {cabins.map((cabin) => (
              <CabinRow cabin={cabin} key={cabin.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CabinTable;
