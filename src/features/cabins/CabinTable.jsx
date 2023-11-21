import { useCabins } from './hooks/useCabins';

import Spinner from '../../components/ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../components/ui/Table';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  // If there is no cabins data to show
  if (!cabins.length) return <div>No data to show at the moment.</div>;

  // FILTER
  // Get the "discount" parameter value from the URL
  const filterValue = searchParams.get('discount') || 'all';

  // Filter cabins based on filter value (discount value)
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // SORT
  const sortBy = searchParams.get('sortBy') || 'cabinName-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins =
    field === 'cabinName'
      ? filteredCabins.sort(
          (a, b) => a.cabinName.localeCompare(b.cabinName) * modifier,
        )
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Cabin Image</Table.Head>
          <Table.Head>Cabin</Table.Head>
          <Table.Head>Capacity</Table.Head>
          <Table.Head>Price</Table.Head>
          <Table.Head>Discount</Table.Head>
          <Table.Head />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sortedCabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CabinTable;
