import Modal from '../../../ui/Modal';
import CreateCabinForm from '../CreateCabinForm';

function AddCabin() {
  return (
    <Modal>
      <Modal.Toggle toggleName="create-cabin">
        <button className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700">
          Add new cabin
        </button>
      </Modal.Toggle>
      <Modal.Window windowName="create-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
