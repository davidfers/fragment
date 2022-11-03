import {
  createContext, useState, useMemo, type Dispatch, type SetStateAction,
} from 'react';
import {type Props } from '../types/search';

const initialState = {
  query: '',
  filter: 'intitle',
  startIndex: 0,
  totalItems: 0,
  setQuery: {} as Dispatch<SetStateAction<string>>,
  setStartIndex: {} as Dispatch<SetStateAction<number>>,
  setFilter: {} as Dispatch<SetStateAction<string>>,
  setTotalItems: {} as Dispatch<SetStateAction<number>>,
};

const SearchContext = createContext(initialState);

function SearchProvider({ children }: Props) {
  const [filter, setFilter] = useState('intitle');
  const [query, setQuery] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const value = useMemo(() => ({
    filter,
    query,
    startIndex,
    totalItems,
    setQuery,
    setFilter,
    setStartIndex,
    setTotalItems,
  }), [filter, query, startIndex, totalItems]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchProvider, SearchContext };
