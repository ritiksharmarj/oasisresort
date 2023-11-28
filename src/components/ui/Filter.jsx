import { useSearchParams } from 'react-router-dom';

/**
 * Filter Component
 * @param {string} searchParameterName - Search parameter of the URL of the page.
 * @param {Array<Object>} options - An array of objects representing filter options.
 * @param {string} options.value - The value associated with the filter option.
 * @param {string} options.label - The label or display text for the filter option.
 * @returns {JSX.Element} - Returns the JSX representation of the Filter component.
 */
function Filter({ searchParameterName, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Current filter to set the active state on the button
  const currentFilter =
    searchParams.get(searchParameterName) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(searchParameterName, value);

    // Set page = 1 to work filter correctly
    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }

  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg border border-gray-300 bg-gray-0 p-1 shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          data-state={option.value === currentFilter ? 'active' : 'inactive'}
          disabled={option.value === currentFilter}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-all hover:text-gray-700 disabled:pointer-events-none data-[state=active]:bg-gray-200 data-[state=active]:text-gray-700 data-[state=active]:shadow-none"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
