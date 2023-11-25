import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

function Pagination({ countRows }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(countRows / PAGE_SIZE);

  function nextPage() {
    // Check if the current page is the last page, if not then jump to the next page
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    // Check if the current page is first page, if not then jump to the previous page
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  // If there is only 1 page
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 py-4">
      <div className="flex-1 text-sm">
        <span>{`Showing ${(currentPage - 1) * PAGE_SIZE + 1} - ${
          currentPage === pageCount ? countRows : currentPage * PAGE_SIZE
        } of ${countRows} results`}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 text-sm font-medium transition-colors hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 text-sm font-medium transition-colors hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
