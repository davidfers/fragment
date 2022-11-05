import BookItem from "./BookItem";

export default function ShelfBookGrid() {
  const ids = localStorage.getItem("booksInShelf") || null;

  const parsedIds: string[] = ids ? JSON.parse(ids) : [];

  return (
    <>
      {parsedIds && parsedIds.length > 0 ? (
        <div className="flex flex-wrap justify-evenly gap-6">
          {parsedIds &&
            parsedIds.map((id: string) => <BookItem key={id} id={id} />)}
        </div>
      ) : (
        <h2 className="text-center">EMPTY</h2>
      )}
    </>
  );
}
