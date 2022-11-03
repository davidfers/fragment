import { useRef } from 'react';
import type { SearchInputProps } from '../types/search';

function SearchForm({
  query, filter, setQuery, handleInputChange, handleRadioChange,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative mb-10 mx-auto max-w-min">
      <ul className="flex justify-center gap-8 my-5">
        <li>
          <label htmlFor="intitle">
            <input
              type="radio"
              value="intitle"
              id="intitle"
              name="filter"
              checked={filter === 'intitle'}
              onChange={handleRadioChange}
            />
            Title
          </label>
        </li>
        <li>
          <label htmlFor="inauthor">
            <input
              type="radio"
              value="inauthor"
              id="inauthor"
              name="filter"
              checked={filter === 'inauthor'}
              onChange={handleRadioChange}
            />
            Author
          </label>
        </li>
        <li>
          <label htmlFor="isbn">
            <input
              type="radio"
              value="isbn"
              id="isbn"
              name="filter"
              checked={filter === 'isbn'}
              onChange={handleRadioChange}
            />
            ISBN
          </label>
        </li>
      </ul>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          aria-label="Search"
          className="border rounded-md text-center max-w-sm py-1 pr-10 pl-4"
        />
        <svg
          style={{
            position: 'absolute', top: 5, right: 5, color: 'gray', cursor: 'pointer',
          }}
          onClick={() => {
            inputRef.current?.focus();
            setQuery('');
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}

export default SearchForm;
