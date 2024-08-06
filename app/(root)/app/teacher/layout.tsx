import { auth } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { ReactNode } from 'react';

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const { userId } = auth();
  const isTeacher =
    (await sql`SELECT id FROM teachers;`).rows.filter((r) => r.id == userId)
      .length > 0;

  if (!isTeacher)
    return (
      <main className="text-gray-100 text-sm flex items-center justify-center h-screen">
        <span className="text-2xl mr-4 py-2 pr-4 border-r-[1px] border-gray-600">
          403
        </span>
        This page is forbidden.
      </main>
    );

  return children;
};

export default RootLayout;
