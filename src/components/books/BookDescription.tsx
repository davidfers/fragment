import parse from "html-react-parser";

import type { Book } from "../../types/book";

export default function BookDescription({ book }: { book: Book }) {
  const { title, authors, publishedDate, publisher, description } =
    book.volumeInfo;
  return (
    <div className="child:mb-2 max-w-sm text-left">
      <div>
        <span className="font-medium">Title: </span>
        {title}
      </div>
      <div>
        <span className="font-medium">Author</span>: {authors}
      </div>
      <div>
        <span className="font-medium">Published Date</span>: {publishedDate}
      </div>
      <div>
        <span className="font-medium">Publisher</span>: {publisher}
      </div>
      <div>
        <span className="font-medium">Description</span>:{" "}
        {description ? parse(description) : "There's no description"}
      </div>
    </div>
  );
}
