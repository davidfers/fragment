import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import navLinks from "./navLinks";
import SigninModal from "../signin/Modal";
import Image from "next/image";
import fragmentLogo from "../../../public/fragment-logo.webp";

function Nav() {
  const path = useRouter().pathname;
  const { data: sessionData } = useSession();
  return (
    <div className="relative py-6">
      <div className="sm-left-6 absolute left-2 w-fit ">
        <Image
          src={fragmentLogo}
          alt="fragment logo"
          className="w-12  xs:w-20 md:ml-8 md:w-28"
        />
      </div>

      <ul className="flex justify-center">
        {navLinks.map((link) => (
          <li className="mr-6" key={link.label}>
            <Link
              href={link.path}
              className={`text-gray-800 hover:font-medium ${
                path === link.path && "font-medium"
              }`}
            >
              {link.label.toUpperCase()}
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
      className="text-gray-800 hover:font-medium"
      onClick={() => signOut()}
    >
      SIGNOUT
    </button>
  );
}

export default Nav;
