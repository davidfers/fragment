import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import ClipLoader from "react-spinners/ClipLoader";
import type { Shelf } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Button from "../Button";

const DeleteShelf = ({
  shelf,
  refetchShelves,
}: {
  shelf: Shelf["name"] | undefined;
  refetchShelves: any;
}) => {
  const { mutate: deleteShelf, isLoading } = trpc.shelf.delete.useMutation({
    onSuccess: () => {
      refetchShelves();
    },
  });

  const handleClick = (close: any) => {
    if (shelf && !isLoading) {
      deleteShelf(shelf, {
        onSuccess: () => close(),
      });
    }
  };

  return (
    <div className="relative">
      <Popover className="relative">
        <Popover.Button>
          <TrashIcon width={28} className="cursor-pointer text-fuchsia-700" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -right-32 z-10 mt-3 w-screen max-w-xs transform px-4 sm:px-0">
            {({ close }) => (
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-6">
                  {shelf ? (
                    <>
                      <span>
                        Are you sure you want to delete
                        <span className="font-medium text-fuchsia-700">
                          {" "}
                          {shelf}{" "}
                        </span>
                        shelf ?
                      </span>
                      <span className="flex items-center gap-4">
                        <Button
                          text="DELETE"
                          type="light"
                          onClick={() => handleClick(close)}
                        />{" "}
                        {isLoading && (
                          <ClipLoader color="#A21C80" size={28} className="" />
                        )}
                      </span>
                    </>
                  ) : (
                    <span className="text-center">No shelves selected</span>
                  )}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default DeleteShelf;
