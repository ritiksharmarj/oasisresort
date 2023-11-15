import { useState } from 'react';
import Modal from '../../../ui/Modal';
import CreateCabinForm from '../CreateCabinForm';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpenModal((show) => !show)}
        className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700"
      >
        Add new cabin
      </button>

      {isOpenModal && (
        <Modal onCloseModal={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
