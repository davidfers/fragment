/* eslint-disable @next/next/no-img-element */
import type { BookProps } from "../../types/book";
import { bookCoverAttr } from "../../utils/utils";

function BookCover({ book }: BookProps) {
  return (
    <img
      src={book.volumeInfo.imageLinks.thumbnail}
      alt={book.volumeInfo.title}
      height={bookCoverAttr.height}
      width={bookCoverAttr.width}
      className="hover:cursor-pointer"
    />
  );
}

export default BookCover;
