import BookCover from './BookCover';
import type { Book } from '../types/book';

export default function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-wrap justify-evenly gap-6">
      {books && books.map((book: Book) => <BookCover key={book.etag} book={book} />
      )}
    </div>
  );
}
