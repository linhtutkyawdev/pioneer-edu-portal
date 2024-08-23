import { auth, clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import CancelButton from './delete_button';
import Search from '@/app/(root)/admin/search';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const TableBody = async ({
  user_id,
  class_id,
  status,
  number,
}: {
  user_id: string;
  class_id: string;
  status: string;
  number: number;
}) => {
  const classData = (await sql`Select * from classes where id = ${class_id};`)
    .rows[0];
  const teacherName = (await clerkClient.users.getUser(classData.teacher_id))
    .fullName;
  return (
    classData && (
      <tr
        key={class_id}
        className="user-row bg-slate-800 border-b-8 border-slate-700"
        data-name={classData.title + ' | ' + teacherName + ' | ' + status}
      >
        <td className="px-3 py-2">
          <p>{number}</p>
        </td>
        <td className="px-3 py-2">
          <p>{classData.title}</p>
        </td>
        <td className="px-3 py-2">
          <p>{teacherName}</p>
        </td>
        <td className="px-3 py-2">
          <p>{status}</p>
        </td>
        <td className="px-3 py-2">
          <CancelButton
            isPending={status === 'pending'}
            id={user_id}
            class_id={parseInt(class_id)}
          />
        </td>
      </tr>
    )
  );
};

const Applications = async () => {
  const { userId } = auth();
  const { rows } =
    await sql`Select * from student_applicants where student_id = ${userId};`;

  return (
    <div className="container mx-auto sm:p-4 bg-slate-700 p-8 rounded">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Your Class Applications
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <colgroup>
            <col className="w-8" />
            <col className="w-60" />
            <col className="w-40" />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead>
            <tr className="">
              <th className="p-3">No.</th>
              <th className="p-3">Class Title</th>
              <th className="p-3">Teacher</th>
              <th className="p-3">Status</th>
              <th className="p-3">
                <Search />
              </th>
            </tr>
          </thead>
          <tbody className="border-b">
            {rows.length !== 0 ? (
              rows.map((r, index) => {
                return (
                  userId && (
                    <TableBody
                      key={r.class_id}
                      user_id={userId}
                      class_id={r.class_id}
                      status={r.status}
                      number={index + 1}
                    />
                  )
                );
              })
            ) : (
              <tr className="pending bg-slate-800 border-b-8 border-slate-700">
                <td colSpan={5} className="px-3 py-4 w-full">
                  You havn't applied any classes yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
