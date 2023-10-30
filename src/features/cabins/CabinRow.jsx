import { formatCurrency } from '../../utils/helpers';

function CabinRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-2">
        <img
          src={image}
          alt={`Cabin ${name}`}
          className="h-16 w-28 rounded-md object-cover"
        />
      </td>
      <td className="whitespace-nowrap px-6 py-2 font-semibold">
        <span>{name}</span>
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
      <td></td>
    </tr>
  );
}

export default CabinRow;
