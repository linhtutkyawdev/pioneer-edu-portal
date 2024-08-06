'use client';

import { Book, Contact, Home, Info, Leaf, User } from 'lucide-react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

const HomeLinks = () => {
  const path = usePathname();
  return (
    <details className="detail open" open={path === '/'}>
      <summary className="text-white whitespace-nowrap cursor-pointer">
        Home Links
      </summary>
      <div className="fixed top-20 right-0 left-0 md:left-auto p-8">
        <div className="bg-dark-1 text-white rounded-md my-auto mx-auto container p-4">
          <a className="mr-2" href="/#">
            <Button variant="link" size="sm" className="text-white p-1">
              <Home className="h-[1em] w-[1em] mr-2" /> Home
            </Button>
          </a>
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
  );
};

export default HomeLinks;
