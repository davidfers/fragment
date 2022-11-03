import Image from "next/image";
import type { BookProps } from "../types/book";

function BookCover({ book }: BookProps) {
  return (
    <Image
      src={book.volumeInfo.imageLinks.thumbnail}
      alt={book.volumeInfo.title}
      height="207"
      width="128"
      className="hover:cursor-pointer"
    />
  );
}

export default BookCover;
