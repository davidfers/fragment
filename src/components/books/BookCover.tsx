/* eslint-disable @next/next/no-img-element */
import type { BookProps } from "../../types/book";

function BookCover({ book }: BookProps) {
  return (
    <img
      src={book.volumeInfo.imageLinks.thumbnail}
      alt={book.volumeInfo.title}
      height="207"
      width="128"
      className="hover:cursor-pointer"
    />
  );
}

export default BookCover;
