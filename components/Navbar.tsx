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
import HomeLinks from './HomeLinks';
import { DoorOpen, PartyPopper } from 'lucide-react';

const Navbar = ({ badge }: { badge?: 'Teacher' | 'Admin' }) => {
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
        {badge && (
          <p className="text-xs font-extrabold bg-blue-1 rounded-full px-2 -mt-4 mx-1 text-white">
            {badge}
          </p>
        )}
      </Link>
      <div className="flex-between gap-5">
        <HomeLinks />
        <a href="/classes">
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
            View Classes
          </Button>
        </a>
        <SignedOut>
          <SignUpButton>
            <Button variant="link" className="text-white">
              <PartyPopper className="mr-2 w-4 h-4" /> Register
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button variant="secondary">
              <DoorOpen className="mr-2 w-4 h-4" />
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
