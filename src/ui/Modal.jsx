import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';

const ModalContext = createContext();

export default function Modal({ children }) {
  const [open, toggle] = useState(false);

  const onCloseModal = () => toggle(!open);

  return (
    <ModalContext.Provider value={{ open, onCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggle({ children }) {
  const { onCloseModal } = useContext(ModalContext);

  return (
    <button
      onClick={onCloseModal}
      className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700"
    >
      {children}
    </button>
  );
}

function Window({ children }) {
  const { open, onCloseModal } = useContext(ModalContext);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-backdrop-color/10 backdrop-blur-sm transition-all duration-500">
      <div className="fixed left-1/2 top-1/2 z-50 w-2/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-0 p-10 shadow-2xl transition-all duration-500">
        <button
          onClick={onCloseModal}
          className="absolute right-1 top-1 rounded-md p-2 text-gray-500 transition-all hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div>{cloneElement(children, { onCloseModal })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Toggle = Toggle;
Modal.Window = Window;
