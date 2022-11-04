/* eslint-disable prefer-const */
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import BookDescription from "../../components/books/BookDescription";
import Button from "../../components/Button";
import { useBook } from "../../hooks/useBooks";

const Book = () => {
  const router = useRouter();
  let { id } = router.query;
  const [bookInShelf, setBookInShelf] = useState(false);
  if (typeof id === "object") {
    id = id[0];
  }
  let {
    // eslint-disable-next-line prefer-const
    isFetching,
    data,
    isError,
    error,
  } = useBook(id || "", Boolean(id));

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
      <button type="button" onClick={() => router.back()}>
        GO BACK
      </button>
      <div className="mt-10  grid justify-center">
        {isFetching && <ClipLoader />}
        {data && data.id && (
          <div className="flex flex-wrap justify-center gap-10">
            <div className="max-w-xs">
              <Image
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
          </div>
        )}
        {isError && <div>{error?.message}, is the id correct?</div>}
      </div>
    </div>
  );
};
export default Book;
