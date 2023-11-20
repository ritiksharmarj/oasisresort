import {
  Copy,
  DotsThreeOutline,
  PencilLine,
  Trash,
} from '@phosphor-icons/react';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../components/ui/Modal';
import ConfirmDelete from '../../components/ui/ConfirmDelete';
import Table from '../../components/ui/Table';
import DropdownMenu from '../../components/ui/DropdownMenu';

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
        <DropdownMenu>
          <Modal>
            <DropdownMenu.Toggle toggleName={cabinId}>
              <DotsThreeOutline size={20} weight="fill" />
            </DropdownMenu.Toggle>

            <DropdownMenu.Content windowName={cabinId}>
              {/* Duplicate cabin */}
              <DropdownMenu.Item
                icon={<Copy size={20} />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </DropdownMenu.Item>

              {/* Edit cabin */}
              <Modal.Toggle toggleName="edit-cabin">
                <DropdownMenu.Item icon={<PencilLine size={20} />}>
                  Edit
                </DropdownMenu.Item>
              </Modal.Toggle>

              {/* Delete cabin */}
              <Modal.Toggle toggleName="delete-cabin">
                <DropdownMenu.Item icon={<Trash size={20} />}>
                  Delete
                </DropdownMenu.Item>
              </Modal.Toggle>
            </DropdownMenu.Content>

            <Modal.Window windowName="edit-cabin">
              <CreateCabinForm editCabinProps={cabin} />
            </Modal.Window>

            <Modal.Window windowName="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </DropdownMenu>
      </Table.Cell>
    </Table.Row>
  );
}

export default CabinRow;
