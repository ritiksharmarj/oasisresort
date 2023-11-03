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
      <div className="border-gray-200 min-w-full overflow-hidden rounded-md border shadow-sm">
        <table className="divide-gray-100 bg-gray-0 min-w-full divide-y text-left text-sm font-medium">
          <thead className="bg-gray-100 text-gray-600 uppercase">
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

          <tbody className="divide-gray-100 divide-y">
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
