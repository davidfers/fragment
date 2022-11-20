import type { Session } from "next-auth";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import Button from "../Button";
import SelectShelf from "./SelectShelf";
import BarLoader from "react-spinners/BarLoader";

const SaveToShelfDB = ({ bookId }: { bookId: string; session: Session }) => {
  const [openAddShelf, setOpenAddShelf] = useState(false);

  const {
    data: bookShelves,
    refetch: refetchBookShelves,
    isLoading,
    isSuccess,
  } = trpc.shelf.getBookShelves.useQuery(bookId, {
    staleTime: Infinity,
    refetchOnMount: "always",
  });

  return (
    <>
      {bookShelves && (
        <ul className="mt-1 flex flex-wrap gap-1" style={{ maxWidth: 200 }}>
          {bookShelves.map((shelf) => (
            <li
              key={shelf.name}
              className="inline rounded-md bg-blue-300 py-1.5 px-3"
            >
              {shelf.name}
            </li>
          ))}
        </ul>
      )}
      {isLoading && <BarLoader className="mx-auto mt-3" />}

      <Button
        className="mx-auto block"
        text={openAddShelf ? "Cancel" : "Manage shelf"}
        type={openAddShelf ? "light" : "solid"}
        onClick={() => setOpenAddShelf((v) => !v)}
      />
      {openAddShelf && isSuccess && (
        <SelectShelf
          shelfList={bookShelves}
          bookId={bookId}
          refetch={refetchBookShelves}
          closeOnSave={setOpenAddShelf}
        />
      )}
    </>
  );
};

export default SaveToShelfDB;
