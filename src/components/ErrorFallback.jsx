import { Spinner } from '@phosphor-icons/react';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-5">
      <div className="flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
        <span className="pb-4 text-xl font-semibold">
          Something went wrong 🧐
        </span>
        <span className="pb-10 font-Sono text-gray-500">{error.message}</span>

        <button
          onClick={resetErrorBoundary}
          className="flex items-center justify-center gap-2 rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700"
        >
          <Spinner size={20} />
          <span>Try again</span>
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
