import Link from "next/link";

import BookCover from "./BookCover";
import type { Book } from "../../types/book";

export default function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-wrap justify-evenly gap-6">
      {books &&
        books.map((book: Book) => (
          <Link key={book.etag} href={`/book/${book.id}`} prefetch={false}>
            <BookCover book={book} />
          </Link>
        ))}
    </div>
  );
}
