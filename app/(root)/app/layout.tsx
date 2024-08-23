import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import { auth } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { User2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StreamVideoProvider from '@/providers/StreamClientProvider';

export const metadata: Metadata = {
  title: 'Pioneer Edu Portal',
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
        <Sidebar isTeacher={isTeacher} />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <main>
              <StreamVideoProvider>{children}</StreamVideoProvider>
            </main>
          </div>
        </section>
      </div>

      {isAdmin && (
        <a
          href="/admin"
          className="fixed bottom-0 left-0 m-6 md:mx-16 z-50 px-6 py-4 flex items-center justify-center gap-2 bg-blue-1 to shadow-lg rounded-full text-white cursor-pointer"
        >
          <span>Admin</span>
          <User2 width="1.2em" height="1.2em" />
        </a>
      )}
    </main>
  );
};

export default RootLayout;
