'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks, teacherSidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = ({ isTeacher }: { isTeacher: boolean }) => {
  const pathname = usePathname();
  if (pathname.startsWith('/app/meeting')) return null;
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] z-20">
      <div className="flex flex-1 flex-col gap-6">
        {(isTeacher ? teacherSidebarLinks : sidebarLinks).map((item) => {
          const isActive =
            pathname === item.route ||
            pathname.endsWith(`${item.route}/`) ||
            new RegExp(item.route + '/-?\\d+$').test(pathname);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start',
                {
                  'bg-blue-1': isActive,
                },
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
