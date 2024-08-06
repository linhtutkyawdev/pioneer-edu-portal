import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import { SignedIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { User2 } from 'lucide-react';
import Footer from './footer';

export const metadata: Metadata = {
  title: 'YOOM',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const { userId } = auth();
  const isAdmin =
    (await sql`SELECT * from admins;`).rows.filter((r) => r.id == userId)
      .length > 0;
  const isTeacher =
    (await sql`SELECT id FROM teachers;`).rows.filter((r) => r.id == userId)
      .length > 0;

  return (
    <main className="relative">
      <Navbar badge={isAdmin ? 'Admin' : isTeacher ? 'Teacher' : undefined} />
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full text-white">{children}</div>
        </section>
      </div>

      <SignedIn>
        <a
          href="/app"
          className="fixed bottom-0 right-0 my-6 mx-6 md:mx-14 z-50 px-6 py-4 flex items-center justify-center gap-2 bg-blue-1 shadow-lg rounded-full text-white cursor-pointer"
        >
          <span>App</span>
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="1.2em"
            width="1.2em"
          >
            <path
              fillRule="evenodd"
              d="M1.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 015.75 7.5h-2.5A1.75 1.75 0 011.5 5.75v-2.5zM3.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5A.25.25 0 006 5.75v-2.5A.25.25 0 005.75 3h-2.5zM1.5 10.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75v-2.5zM3.25 10a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM8.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5A1.75 1.75 0 018.5 5.75v-2.5zM10.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM8.5 10.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75v-2.5zm1.75-.25a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5z"
            />
          </svg>
        </a>
      </SignedIn>

      {isAdmin && (
        <a
          href="/admin"
          className="fixed bottom-0 left-0 m-6 mx-6 md:mx-14 z-50 px-6 py-4 flex items-center justify-center gap-2 bg-blue-1 shadow-lg rounded-full text-white cursor-pointer"
        >
          <span>Admin</span>
          <User2 width="1.2em" height="1.2em" />
        </a>
      )}

      <Footer />
    </main>
  );
};

export default RootLayout;
