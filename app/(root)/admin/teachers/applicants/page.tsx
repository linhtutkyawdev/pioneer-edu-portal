import { clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import Search from '../../search';
import AcceptButton from './accept_button';
import DenyButton from './deny_button';

const Users = async () => {
  const { rows } =
    await sql`Select * from teacher_applicants where status = 'pending';`;
  const applicantIdList = rows.map((row) => row.id);
  const applicantList = await Promise.all(
    applicantIdList.map((id) => clerkClient.users.getUser(id)),
  );

  return (
    <div className="container mx-auto sm:p-4 bg-slate-700 p-8 rounded">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Teacher Applications
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <colgroup>
            <col className="w-20" />
            <col />
            <col />
            <col className="w-24" />
            <col className="w-24" />
          </colgroup>
          <thead>
            <tr className="">
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th colSpan={2} className="p-3">
                <Search />
              </th>
            </tr>
          </thead>
          <tbody className="border-b">
            {applicantList.map((user) => {
              return (
                <tr
                  key={user.id}
                  className="user-row bg-slate-800 border-b-8 border-slate-700"
                  data-name={user.fullName}
                >
                  <td className="px-3 py-2">
                    <img
                      src={user.imageUrl}
                      className="rounded-full object-cover w-12 h-12"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <p>{user.fullName}</p>
                  </td>
                  <td className="px-3 py-2">
                    <p>{user.primaryEmailAddress?.emailAddress}</p>
                  </td>
                  <td className="px-3 py-2">
                    <AcceptButton id={user.id} />
                  </td>
                  <td className="px-3 py-2">
                    <DenyButton id={user.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
