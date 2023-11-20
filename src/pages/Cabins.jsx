import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import AddCabin from '../features/cabins/components/AddCabin';

function Cabins() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">All cabins</span>

        <div className="flex items-center gap-2">
          <CabinTableOperations />
          <AddCabin />
        </div>
      </div>

      <CabinTable />
    </>
  );
}

export default Cabins;
