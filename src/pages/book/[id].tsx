/* eslint-disable prefer-const */
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import BookDescription from "../../components/books/BookDescription";
import Button from "../../components/Button";
import { useBook } from "../../hooks/useBooks";
import SaveBookToShelfDB from "../../components/books/SaveBookToShelfDB";
import SaveBookToShelfLS from "../../components/books/SaveBookToShelfLS";

const Book = () => {
  const router = useRouter();

  const { data: sessionData } = useSession();

  let { id } = router.query;
  if (typeof id === "object") {
    id = id[0];
  }
  const { isFetching, data, isError } = useBook(id || "", Boolean(id));

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
                {sessionData && sessionData.user ? (
                  <SaveBookToShelfDB bookId={data.id} session={sessionData} />
                ) : (
                  <SaveBookToShelfLS book={data} />
                )}
              </div>
              <BookDescription book={data} />
            </>
          )}
        </div>
        {isError && (
          <div>
            Could not find book with id &quot;{id}&quot;, is the id correct?
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
