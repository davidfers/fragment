import Link from 'next/link';
import links from './navLinks';
import SigninModal from './Modal';

function Nav() {
  return (
    <div className="py-6">
      <ul className="flex justify-center">
        {[...links].map((link) => (
          <li className="mr-6" key={link[1]}>
            <Link
              href={link[0]}
              className="first-linetext-gray-800"
            >
              {link[1].toUpperCase()}
            </Link>
          </li>
        ))}
        <li>
        <SigninModal />
        </li>
      </ul>
    </div>
  );
}

export default Nav;
