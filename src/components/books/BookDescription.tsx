import { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import type { Book } from "../../types/book";
import Button from "../Button";

export default function BookDescription({ book }: { book: Book }) {
  const descriptionHeight = useRef<number | "auto">("auto");
  const [isExpanded, setIsExpanded] = useState(true);
  const [readMoreNeeded, setReadMoreNeeded] = useState(false);

  useEffect(() => {
    const descHeight = document.getElementById("description")?.offsetHeight;
    document.getElementById("bookInfo")?.classList.remove("opacity-0");

    if (descHeight && descHeight > 200) {
      setReadMoreNeeded(true);
      setIsExpanded(false);
      descriptionHeight.current = descHeight;
    }
  }, []);

  const { title, authors, publishedDate, publisher, description } =
    book.volumeInfo;
  return (
    <div
      id="bookInfo"
      className="text-left opacity-0 transition-opacity duration-500 xs:max-w-sm lg:max-w-lg [&>*]:mb-1.5 [&>div>span]:font-semibold"
    >
      <div>
        <span>Title: </span>
        {title}
      </div>
      <div>
        <span>Author</span>: {authors}
      </div>
      <div>
        <span>Published Date</span>: {publishedDate}
      </div>
      <div>
        <span>Publisher</span>: {publisher}
      </div>
      <div id="description">
        <span className="mb-2">Description:</span>
        <div
          className="overflow-hidden transition-all duration-500"
          style={
            isExpanded ? { height: descriptionHeight.current } : { height: 200 }
          }
        >
          {description ? parse(description) : "There's no description"}
        </div>
      </div>
      {readMoreNeeded && (
        <Button
          type="light"
          onClick={() => setIsExpanded((v) => !v)}
          text={isExpanded ? "Show less" : "Show more"}
          className="mx-auto mt-3 block"
        />
      )}
    </div>
  );
}
