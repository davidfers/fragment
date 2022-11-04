import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import links from "./navLinks";
import SigninModal from "../signin/Modal";
import Button from "../Button";

function Nav() {
  const { data: sessionData } = useSession();
  return (
    <div className="py-6">
      <ul className="flex justify-center">
        {[...links].map((link) => (
          <li className="mr-6" key={link[1]}>
            <Link href={link[0]} className="first-linetext-gray-800">
              {link[1].toUpperCase()}
            </Link>
          </li>
        ))}
        <li>
          {sessionData && sessionData.user ? <LoggedIn /> : <SigninModal />}
        </li>
      </ul>
    </div>
  );
}

function LoggedIn() {
  return (
    <button
      type="button"
      className="hover:font-medium active:text-gray-500"
      onClick={() => signOut()}
    >
      SIGNOUT
    </button>
  );
}

export default Nav;
