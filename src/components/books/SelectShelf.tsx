import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { Shelf } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import type { Dispatch, SetStateAction } from "react";
import { Fragment, useState } from "react";
import Button from "../Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectShelf = ({
  shelfList,
  refetch,
  bookId,
  closeOnSave,
}: {
  shelfList: Shelf[];
  refetch?: any;
  bookId: string;
  closeOnSave: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: shelfListAll, isSuccess } = trpc.shelf.getShelves.useQuery(
    undefined,
    {
      onSuccess: (data) =>
        setSelectedShelves(
          data.filter((el) => shelfList.find((subEl) => subEl.id === el.id))
        ),
    }
  );
  const { mutate: addToShelf } = trpc.shelf.addBook.useMutation({
    onSuccess: () => {
      if (refetch) refetch();
    },
  });

  const { mutate: removeFromShelf } = trpc.shelf.removeBook.useMutation({
    onSuccess: () => {
      if (refetch) refetch();
    },
  });

  const handleSave = () => {
    const shelvesToSave = selectedShelves
      .filter((el) => !shelfList.find((subEl) => subEl.id === el.id))
      .map((el) => el.id);
    const shelvesToRemove = shelfList
      .filter((el) => !selectedShelves.find((subEl) => subEl.id === el.id))
      .map((el) => el.id);

    shelvesToSave.length > 0 &&
      addToShelf({
        bookId: bookId,
        shelfId: shelvesToSave,
      });
    shelvesToRemove.length > 0 &&
      removeFromShelf({
        bookId: bookId,
        shelfId: shelvesToRemove,
      });
    closeOnSave(false);
  };

  const [selectedShelves, setSelectedShelves] = useState(shelfList);
  console.log("check shelfList", shelfList);
  console.log("check shelfList ALL", shelfListAll);

  return shelfListAll && isSuccess ? (
    <>
      <Listbox value={selectedShelves} onChange={setSelectedShelves} multiple>
        <Listbox.Button
          className="relative 
                        my-2
                        w-full
                        cursor-default 
                        rounded-lg 
                        bg-white
                        py-2
                        pl-3
                        pr-10
                        text-left
                        shadow-md
                        focus:outline-none
                        focus-visible:border-indigo-500
                        focus-visible:ring-2
                        focus-visible:ring-white
                        focus-visible:ring-opacity-75
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-fuchsia-300
                        sm:text-sm"
        >
          <span className="block truncate">
            {selectedShelves.length === 0
              ? "Select Shelf"
              : selectedShelves.length === 1
              ? `${selectedShelves.length} shelf selected`
              : `${selectedShelves.length} shelves selected`}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options>
            {shelfListAll.map((shelf) => (
              <Listbox.Option
                key={shelf.id}
                value={shelf}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-fuchsia-100 text-amber-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {shelf.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-fuchsia-700">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      <Button text="Save" onClick={() => handleSave()} />
    </>
  ) : (
    <div>Fetching shelves...</div>
  );
};

export default SelectShelf;
