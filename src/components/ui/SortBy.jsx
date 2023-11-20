import { useSearchParams } from 'react-router-dom';

function SortBy({ searchParameterName, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Current SortBy to set the active value to the select field
  const currentSortBy =
    searchParams.get(searchParameterName) || options.at(0).value;

  function handleChange(e) {
    searchParams.set(searchParameterName, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select onChange={handleChange} value={currentSortBy}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
