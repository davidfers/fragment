import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useBook } from "../../hooks/useBooks";
import BookCover from "../books/BookCover";

export default function BookItem({ id }: { id: string }) {
  const { data, isFetching, isSuccess } = useBook(id, true);
  return (
    <div>
      {isFetching && <ClipLoader />}
      {isSuccess && (
        <Link key={data.etag} href={`/book/${data.id}`}>
          <BookCover book={data} />
        </Link>
      )}
    </div>
  );
}
