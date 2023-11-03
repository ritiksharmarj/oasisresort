import { Trash } from '@phosphor-icons/react';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    cabinName,
    maxCapacity,
    regularPrice,
    discount,
    cabinImage,
  } = cabin;

  const queryClient = useQueryClient();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: (cabinId) => deleteCabin(cabinId),
    onSuccess: () => {
      toast.success('Cabin successfully deleted.');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
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
        <span className="text-green-700">{formatCurrency(discount)}</span>
      </td>

      <td>
        <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
          <Trash size={20} />
        </button>
      </td>
    </tr>
  );
}

export default CabinRow;
