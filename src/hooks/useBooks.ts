import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { Book } from '../types/book';
import { GetBook, GetBooks } from '../services/googlebooks';

export function useBooks(query: string, filter: string) {
  return useInfiniteQuery(
    ['books', query, filter],
    ({ pageParam = 0 }) => GetBooks(query, filter, pageParam),
    {
      enabled: query.length >= 2, // If we have searchQuery, then enable the query on render
      getNextPageParam: (lastPage, allPages) => (allPages[0].totalItems / 20) >= allPages.length
    },
  );
}

export function useBook(id: string, enabled: boolean) {
  return useQuery<Book, Error>(
    ['book', id],
    () => GetBook(id),
    {
      enabled,
    },
  );
}
