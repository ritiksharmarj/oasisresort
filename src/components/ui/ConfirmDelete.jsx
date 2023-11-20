function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold">Delete {resourceName}</h3>
      <p className="mt-2 text-sm text-gray-500">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          disabled={disabled}
          onClick={onCloseModal}
          className="text-sm font-medium text-gray-600"
        >
          Cancel
        </button>
        <button
          disabled={disabled}
          onClick={onConfirm}
          className="disabled:bg-red-200 bg-red-600 rounded-md px-3 py-2 text-sm font-medium text-red-100 shadow-sm transition-all hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
