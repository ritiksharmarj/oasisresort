import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';

function Modal({ children, onCloseModal }) {
  return createPortal(
    <div className="fixed inset-0 z-50 bg-backdrop-color/10 backdrop-blur-sm transition-all duration-500">
      <div className="fixed left-1/2 top-1/2 z-50 w-2/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-0 p-10 shadow-2xl transition-all duration-500">
        <button
          onClick={onCloseModal}
          className="absolute right-1 top-1 rounded-md p-2 text-gray-500 transition-all hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
