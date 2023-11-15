import { useCabins } from './hooks/useCabins';

import { Spinner } from '../../ui/Spinner';
import CabinRow from './CabinRow';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-full overflow-hidden rounded-md border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 bg-gray-0 text-left text-sm font-medium">
          <thead className="bg-gray-100 uppercase text-gray-600">
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

          <tbody className="divide-y divide-gray-100">
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
