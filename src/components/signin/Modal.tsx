/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import SigninForm from "./SigninForm";

function SigninModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="
          transition
        duration-150
          ease-in-out
          hover:font-medium
          active:text-gray-500"
        onClick={() => setIsOpen(true)}
      >
        SIGN IN
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-96 max-w-sm rounded-lg bg-white p-6 shadow-xl shadow-gray-600">
            <Dialog.Title className="text-right">
              {" "}
              <XMarkIcon
                className="inline h-6 w-6 cursor-pointer text-gray-500"
                onClick={() => setIsOpen(false)}
              />{" "}
            </Dialog.Title>
            <SigninForm setIsOpen={setIsOpen} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default SigninModal;
