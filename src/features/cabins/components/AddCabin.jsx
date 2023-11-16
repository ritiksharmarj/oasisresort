import Modal from '../../../ui/Modal';
import CreateCabinForm from '../CreateCabinForm';

function AddCabin() {
  return (
    <Modal>
      <Modal.Toggle>Add new cabin</Modal.Toggle>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
