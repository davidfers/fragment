import { useState, useRef } from "react";
import { trpc } from "../../utils/trpc";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { ClipLoader } from "react-spinners";

const CreateShelf = ({ refetchShelves }: { refetchShelves: any }) => {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { mutate: createShelf, isLoading } = trpc.shelf.create.useMutation({
    onSuccess: () => {
      setIsActive(false);
      setInput("");
      refetchShelves();
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    createShelf(input);
  };

  return (
    <div className="relative text-center">
      {!isActive ? (
        <PlusCircleIcon
          width={28}
          className="ml-3 inline cursor-pointer text-fuchsia-700"
          onClick={() => {
            setIsActive((v) => !v);
            inputRef.current?.focus();
          }}
        />
      ) : (
        <MinusCircleIcon
          width={28}
          className="ml-3 inline cursor-pointer text-fuchsia-700"
          onClick={() => {
            setIsActive((v) => !v);
            setInput("");
          }}
        />
      )}
      <input
        type="text"
        ref={inputRef}
        value={input}
        disabled={isLoading}
        placeholder="Press enter to save"
        onChange={(e) => setInput(e.target.value)}
        className={`mb-3 transform  border-2	border-fuchsia-700 transition-all duration-500 focus:outline-none ${
          isActive
            ? "border-opacity-1 h-10 w-60 p-1"
            : " h-0 w-0 border-opacity-0"
        }`}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSubmit();
        }}
      />
      {isLoading && (
        <ClipLoader
          color="#A21C80"
          size={28}
          className="absolute right-2 top-2"
        />
      )}
    </div>
  );
};

export default CreateShelf;
