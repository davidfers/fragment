import axios from 'axios';
import type { Book } from '../types/book';

export type BooksRes = {
  books: Book[];
  totalItems: number;
};

const SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes/';

export const GetBooks = async (
  query: string,
  filter: string,
  startIndex: number,
): Promise<BooksRes> => {
  const { data } = await axios.get(
    `${SEARCH_URL}?q=${filter}:${query}&projection=lite&startIndex=${startIndex}&maxResults=20`,
  );
  return {
    books: data.items?.filter((el: Book) => el.volumeInfo.imageLinks),
    totalItems: data.totalItems,
  };
};

export const GetBook = async (
  id: string,
): Promise<Book> => {
  const { data } = await axios.get(
    `${SEARCH_URL}${id}`,
  );
  return data;
};
