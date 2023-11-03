import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">All cabins</span>
        <button
          onClick={() => setShowForm((show) => !show)}
          className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm hover:bg-brand-700"
        >
          Add new cabin
        </button>
      </div>

      <CabinTable />
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
