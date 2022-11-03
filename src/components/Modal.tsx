/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';

function SigninModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => {
    setIsOpen((v) => !v);
  };
  return (
    <>
      <button
        type="button"
        className="
          hover:font-medium
        active:text-gray-500
          transition
          duration-150
          ease-in-out"
        onClick={toggleModal}
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
            <Dialog.Title className="text-right"> <XMarkIcon className="h-6 w-6 text-gray-500 cursor-pointer inline" onClick={() => setIsOpen(false)} /> </Dialog.Title>

            {isLogin && (
            <>
              <h2>Sign In</h2>
              <div className="text-sm font-medium text-gray-500">
                Not registered?{' '}
                <button
                  type="button"
                  className="text-fuchsia-700 hover:underline"
                  onClick={() => setIsLogin((v) => !v)}
                >
                  Create account
                </button>
              </div>
            </>
            )}
            {!isLogin && (
            <>
              <h2>Signup</h2>
              <button
                type="button"
                className="text-sm font-medium text-fuchsia-700 hover:underline"
                onClick={() => setIsLogin((v) => !v)}
              >
                Back to login
              </button>
            </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default SigninModal;
