import Image from 'next/image';
import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

import MobileNav from './MobileNav';
import { Button } from './ui/button';
import { Book, Contact, Info, Leaf, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.png"
          width={100}
          height={100}
          alt="logo"
          className="-my-2"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Pioneer Education Portal
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedOut>
          <SignUpButton>
            <Button variant="link" className="text-white">
              Register
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button variant="secondary">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <details className="detail" open>
            <summary className="text-white whitespace-nowrap">
              Home Links
            </summary>
            <div className="fixed top-20 right-0 left-0 md:left-auto p-8">
              <div className="bg-dark-1 text-white rounded-md my-auto mx-auto container p-4">
                <a className="mr-2" href="/#statics">
                  <Button variant="link" size="sm" className="text-white p-1">
                    <Info className="h-[1em] w-[1em] mr-2" /> Statics
                  </Button>
                </a>
                <a className="mr-2" href="/#teachers">
                  <Button variant="link" size="sm" className="text-white p-1">
                    <Book className="h-[1em] w-[1em] mr-2" /> Teachers
                  </Button>
                </a>
                <a className="mr-2" href="/#features">
                  <Button variant="link" size="sm" className="text-white p-1">
                    <Leaf className="h-[1em] w-[1em] mr-2" /> Features
                  </Button>
                </a>
                <a className="mr-2" href="/#team">
                  <Button variant="link" size="sm" className="text-white p-1">
                    <User className="h-[1em] w-[1em] mr-2" /> Our Team
                  </Button>
                </a>
                <a className="mr-2" href="/#contact">
                  <Button variant="link" size="sm" className="text-white p-1">
                    <Contact className="h-[1em] w-[1em] mr-2" /> Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </details>
          <a href="/courses">
            <Button variant="link" className="text-white">
              <svg
                fill="none"
                className="inline-block mr-2"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M18.319 14.433A8.001 8.001 0 006.343 3.868a8 8 0 0010.564 11.976l.043.045 4.242 4.243a1 1 0 101.415-1.415l-4.243-4.242a1.116 1.116 0 00-.045-.042zm-2.076-9.15a6 6 0 11-8.485 8.485 6 6 0 018.485-8.485z"
                  clipRule="evenodd"
                />
              </svg>{' '}
              View Courses
            </Button>
          </a>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
