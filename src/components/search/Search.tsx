/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import useDebounce from "../../hooks/useDebounce";
import { useBooks } from "../../hooks/useBooks";
import { SearchContext } from "../../contexts/SearchContext";

function Search() {
  const { query, filter, setQuery, setFilter } = useContext(SearchContext);

  const debouncedSearchQuery = useDebounce(query.trim(), 300);

  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } = useBooks(
    debouncedSearchQuery,
    filter
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value.replace(/^\s+$/gm, "").replace(/\s{2,}/gm, " "));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <SearchForm
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
        setQuery={setQuery}
        filter={filter}
        query={query}
      />
      <SearchResults
        isLoading={isLoading}
        isFetching={isFetching}
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        lastIndex={
          data?.pageParams[data.pageParams.length - 1] as number | undefined
        }
      />
    </>
  );
}

export default Search;
