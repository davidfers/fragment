import { useEffect, useState } from "react";
import type { BookProps } from "../../types/book";
import Button from "../Button";

const SaveBookToShelfLS = ({ book }: BookProps) => {
  const [bookInShelf, setBookInShelf] = useState(false);

  useEffect(() => {
    const prevItems = localStorage.getItem("booksInShelf");
    if (prevItems) {
      const parsedItems = JSON.parse(prevItems);
      if (parsedItems.includes(book?.id)) {
        setBookInShelf(true);
      }
    }
  }, [book]);

  const handleClick = () => {
    const prevItems = localStorage.getItem("booksInShelf");
    if (prevItems && book) {
      const parsedItems = JSON.parse(prevItems);
      if (parsedItems.includes(book.id)) {
        parsedItems.splice(parsedItems.indexOf(book.id), 1);
      } else {
        parsedItems.push(book.id);
      }
      localStorage.setItem("booksInShelf", JSON.stringify(parsedItems));
    } else {
      localStorage.setItem("booksInShelf", `["${book?.id}"]`);
    }
    setBookInShelf((v) => !v);
  };

  return (
    <Button
      text={bookInShelf ? "Remove from shelf" : "Add to shelf"}
      onClick={handleClick}
    />
  );
};

export default SaveBookToShelfLS;
