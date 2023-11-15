import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/components/AddCabin';

function Cabins() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">All cabins</span>
        <AddCabin />
      </div>

      <CabinTable />
    </>
  );
}

export default Cabins;
