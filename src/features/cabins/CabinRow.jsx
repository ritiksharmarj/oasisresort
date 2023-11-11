import { useState } from 'react';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { PencilLine, Trash } from '@phosphor-icons/react';
import { formatCurrency } from '../../utils/helpers';

import CreateCabinForm from './CreateCabinForm';

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const {
    id: cabinId,
    cabinName,
    maxCapacity,
    regularPrice,
    discount,
    cabinImage,
  } = cabin;

  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-6 py-2">
          <img
            src={cabinImage}
            alt={`Cabin ${cabinName}`}
            className="h-16 w-28 rounded-md object-cover"
          />
        </td>
        <td className="whitespace-nowrap px-6 py-2 font-semibold">
          <span>{cabinName}</span>
        </td>
        <td className="whitespace-nowrap px-6 py-2">
          <span>Fits up to {maxCapacity} guests</span>
        </td>
        <td className="whitespace-nowrap px-6 py-2 font-semibold">
          <span>{formatCurrency(regularPrice)}</span>
        </td>
        <td className="whitespace-nowrap px-6 py-2">
          {discount ? (
            <span className="text-green-700">{formatCurrency(discount)}</span>
          ) : (
            <span>&mdash;</span>
          )}
        </td>

        <td>
          <button onClick={() => setShowForm((show) => !show)}>
            <PencilLine size={20} alt="Edit this cabin" />
          </button>

          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <Trash size={20} alt="Delete this cabin" />
          </button>
        </td>
      </tr>

      {showForm && <CreateCabinForm editCabinProps={cabin} />}
    </>
  );
}

export default CabinRow;
