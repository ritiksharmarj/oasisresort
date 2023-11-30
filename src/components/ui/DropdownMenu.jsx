import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const DropdownMenuContext = createContext();

export default function DropdownMenu({ children }) {
  const [validateName, setValidateName] = useState('');
  const [position, setPosition] = useState(null);

  const onCloseDropdownMenu = () => setValidateName('');

  return (
    <DropdownMenuContext.Provider
      value={{
        validateName,
        setValidateName,
        onCloseDropdownMenu,
        position,
        setPosition,
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

function Toggle({ children, className = '', toggleName }) {
  const { setValidateName, setPosition } = useContext(DropdownMenuContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest('button').getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height,
    });

    setValidateName(toggleName);
  }

  return (
    <button
      onClick={handleClick}
      className={twMerge(
        'rounded-md p-2 text-gray-500 transition-all hover:bg-gray-100',
        className,
      )}
    >
      {children}
    </button>
  );
}

function Content({ children, windowName }) {
  const { validateName, onCloseDropdownMenu, position } =
    useContext(DropdownMenuContext);

  if (validateName !== windowName) return null;

  return createPortal(
    <>
      <div
        onClick={onCloseDropdownMenu}
        className="fixed inset-0 z-40 opacity-0 transition-all duration-500"
      />
      <div
        className="fixed z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-gray-0 p-1 shadow-md transition-all duration-500"
        style={{ right: `${position.x}px`, top: `${position.y}px` }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}

function Item({ children, className = '', icon, onClick, disabled }) {
  const { onCloseDropdownMenu } = useContext(DropdownMenuContext);

  function handleClick() {
    onClick?.();
    onCloseDropdownMenu();
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={twMerge(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 disabled:cursor-not-allowed',
        className,
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

DropdownMenu.Toggle = Toggle;
DropdownMenu.Content = Content;
DropdownMenu.Item = Item;
