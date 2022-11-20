import { useCallback, useState } from "react";
import type { Shelf } from "@prisma/client";
import useEmblaCarousel from "embla-carousel-react";
import { trpc } from "../../utils/trpc";
import BookItem from "./BookItem";
import CreateShelf from "./CreateShelf";
import DeleteShelf from "./DeleteShelf";

export const ShelfTabs = ({
  shelves,
  refetchShelves,
}: {
  shelves: Shelf[];
  refetchShelves: any;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: booksFromShelf } = trpc.shelf.getBooksFromShelf.useQuery(
    shelves[activeIndex]?.id,
    {
      refetchOnMount: "always",
    }
  );
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    startIndex: 0,
  });
  const onSlideClick = useCallback(
    (index: number) => {
      if (embla && embla.clickAllowed()) {
        setActiveIndex(index);
      }
    },
    [embla]
  );
  return (
    <>
      <div className="mb-5 flex items-center justify-center gap-10">
        <CreateShelf refetchShelves={refetchShelves} />
        {shelves.length > 0 && (
          <DeleteShelf
            shelf={shelves[activeIndex]?.name}
            refetchShelves={refetchShelves}
          />
        )}
      </div>
      <div className="embla relative overflow-hidden px-3" ref={emblaRef}>
        <div className="embla__container  flex items-center gap-2 px-3 text-center">
          {shelves.map((shelf, index) => (
            <div
              className={`embla__slide min-w-fit cursor-pointer rounded-lg border-2 border-solid border-fuchsia-700  py-2 px-4 ${
                index === activeIndex
                  ? "bg-fuchsia-700 text-white"
                  : "bg-fuchsia-100 text-fuchsia-700 "
              }`}
              key={shelf.id}
              onClick={() => onSlideClick(index)}
            >
              {shelf.name}
            </div>
          ))}
        </div>
      </div>
      {booksFromShelf && (
        <div className="mt-6 flex flex-wrap justify-evenly gap-6">
          {booksFromShelf.map((id) => {
            return <BookItem id={id} key={id} />;
          })}
        </div>
      )}
    </>
  );
};

export default ShelfTabs;
