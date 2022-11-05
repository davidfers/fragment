import Link from "next/link";
import { useBook } from "../../hooks/useBooks";
import BookCover from "../books/BookCover";
import ImagePlaceholder from "../ImagePlaceholder";

export default function BookItem({ id }: { id: string }) {
  const { data, isFetching, isSuccess } = useBook(id, true);
  return (
    <div>
      {isFetching && (
        <div className="blur-sm">
          <ImagePlaceholder h={207} w={128} />
        </div>
      )}
      {isSuccess && (
        <Link key={data.etag} href={`/book/${data.id}`} prefetch={false}>
          <BookCover book={data} />
        </Link>
      )}
    </div>
  );
}
