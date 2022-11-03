/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import type { InfiniteData } from "@tanstack/react-query";
import BookGrid from "./BookGrid";
import { SearchContext } from "../contexts/SearchContext";
import type { BooksRes } from "../services/googlebooks";

function SearchResults({
  isLoading,
  isFetching,
  data,
  fetchNextPage,
  hasNextPage,
  lastIndex,
}: {
  isLoading: boolean;
  isFetching: boolean;
  data: InfiniteData<BooksRes> | undefined;
  fetchNextPage: (e: any) => any;
  hasNextPage: boolean | undefined;
  lastIndex: number | undefined;
}) {
  const { query } = useContext(SearchContext);

  const bottomEl = useRef(null);

  useEffect(() => {
    const options = {
      root: document,
      rootMargin: "80px",
      threshold: 1,
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0] && entries[0].isIntersecting) {
        if (hasNextPage) {
          fetchNextPage({ pageParam: (lastIndex || 0) + 20 });
        }
      }
    };
    const observer = new IntersectionObserver(callback, options);
    if (bottomEl.current) {
      observer.observe(bottomEl.current);
    }
    return () => {
      observer?.disconnect();
    };
  }, [data?.pages]);

  const books = data?.pages.reduce(
    (prev: BooksRes, curr: BooksRes) => {
      if (prev.totalItems > 0) {
        return {
          totalItems: curr.totalItems,
          // take into account books may not exist (books are filtered by image exists)
          books: curr.books ? [...prev.books, ...curr.books] : [...prev.books],
        };
      }
      return curr;
    },
    {
      books: [],
      totalItems: 0,
    }
  ).books;

  return (
    <div className="mx-auto mt-16 max-w-sm sm:max-w-2xl">
      {books && query.length > 1 && (
        <>
          <BookGrid books={books} />
          <div ref={bottomEl} />
        </>
      )}
      {query.length < 2 && !isFetching && (
        <div>
          <p className="text-center text-xl">Search for your book!</p>
          <p className="text-center">You can search by author, title or ISBN</p>
        </div>
      )}
      {query.length >= 2 && !books && !isLoading && (
        <div className="py-16">
          <p className="break-words text-center text-xl">
            Can&apos;t find any books by &quot;{query}&quot;...
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
