export interface Book {
  id: string;
  etag: string;
  volumeInfo: {
    authors?: [];
    description: string;
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    publisher?: string;
    publishedDate?: string;
  };
}

export interface BookProps {
  book: Book;
}

export interface BooksProps {
  books: Book[];
}

export interface SearchResultsProps {
  books: Book[];
  query: string;
  isLoading: boolean;
  refEl: React.MutableRefObject;
}
