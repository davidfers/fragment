/* eslint-disable prefer-const */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import BookDescription from "../../components/books/BookDescription";
import Button from "../../components/Button";
import { useBook } from "../../hooks/useBooks";

const Book = () => {
  const router = useRouter();

  let { id } = router.query;
  if (typeof id === "object") {
    id = id[0];
  }

  const [bookInShelf, setBookInShelf] = useState(false);

  const { isFetching, data, isError, error } = useBook(id || "", Boolean(id));

  useEffect(() => {
    const prevItems = localStorage.getItem("booksInShelf");
    if (prevItems) {
      const parsedItems = JSON.parse(prevItems);
      if (parsedItems.includes(data?.id)) {
        setBookInShelf(true);
      }
    }
  }, [data]);

  const handleClick = () => {
    const prevItems = localStorage.getItem("booksInShelf");
    if (prevItems && data) {
      const parsedItems = JSON.parse(prevItems);
      if (parsedItems.includes(data.id)) {
        parsedItems.splice(parsedItems.indexOf(data.id), 1);
      } else {
        parsedItems.push(data.id);
      }
      localStorage.setItem("booksInShelf", JSON.stringify(parsedItems));
    } else {
      localStorage.setItem("booksInShelf", `["${data?.id}"]`);
    }
    setBookInShelf((v) => !v);
  };

  return (
    <div className="text-center">
      <Button type="light" onClick={() => router.back()} text="GO BACK" />
      <div className="mt-10  grid justify-center">
        <div className="flex flex-wrap justify-center gap-10">
          {isFetching && <ClipLoader className="mx-40 max-w-sm" />}
          {data && data.id && (
            <>
              <div className="max-w-xs">
                <img
                  src={data.volumeInfo.imageLinks.thumbnail}
                  alt={data.volumeInfo.title}
                  width="200"
                  height="300"
                  className="max-w-full rounded-md"
                />
                <Button
                  text={bookInShelf ? "Remove from shelf" : "Add to shelf"}
                  onClick={handleClick}
                />
              </div>
              <BookDescription book={data} />
            </>
          )}
        </div>
        {isError && <div>{error?.message}, is the id correct?</div>}
      </div>
    </div>
  );
};
export default Book;
