import { Copy, PencilLine, Trash } from '@phosphor-icons/react';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const {
    id: cabinId,
    cabinName,
    maxCapacity,
    regularPrice,
    discount,
    cabinImage,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      cabinName: `Copy of ${cabinName}`,
      maxCapacity,
      regularPrice,
      discount,
      cabinImage,
      description,
    });
  }

  return (
    <Table.Row>
      <Table.Cell>
        <img
          src={cabinImage}
          alt={`Cabin ${cabinName}`}
          className="h-16 w-28 rounded-md object-cover"
        />
      </Table.Cell>
      <Table.Cell className="font-semibold">
        <span>{cabinName}</span>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap px-6 py-2">
        <span>Fits up to {maxCapacity} guests</span>
      </Table.Cell>
      <Table.Cell className="font-semibold">
        <span>{formatCurrency(regularPrice)}</span>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap px-6 py-2">
        {discount ? (
          <span className="text-green-700">{formatCurrency(discount)}</span>
        ) : (
          <span>&mdash;</span>
        )}
      </Table.Cell>

      <Table.Cell>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <Copy size={20} alt="Duplicate this cabin" />
        </button>

        {/* Edit cabin */}
        <Modal>
          <Modal.Toggle toggleName="edit-cabin">
            <button>
              <PencilLine size={20} alt="Edit this cabin" />
            </button>
          </Modal.Toggle>
          <Modal.Window windowName="edit-cabin">
            <CreateCabinForm editCabinProps={cabin} />
          </Modal.Window>
        </Modal>

        {/* Delete cabin */}
        <Modal>
          <Modal.Toggle toggleName="delete-cabin">
            <button>
              <Trash size={20} alt="Delete this cabin" />
            </button>
          </Modal.Toggle>
          <Modal.Window windowName="delete-cabin">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}

export default CabinRow;
