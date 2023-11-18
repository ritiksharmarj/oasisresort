import { useCabins } from './hooks/useCabins';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

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
        {cabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CabinTable;
