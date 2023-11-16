import { Plus } from '@phosphor-icons/react';
import Modal from '../../../ui/Modal';
import CreateCabinForm from '../CreateCabinForm';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Toggle toggleName="create-cabin">
          <button className="flex items-center justify-center gap-2 rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700">
            <Plus size={20} />
            <span>Add new cabin</span>
          </button>
        </Modal.Toggle>
        <Modal.Window windowName="create-cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
