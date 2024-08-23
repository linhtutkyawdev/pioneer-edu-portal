import { clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import PrivilegeButton from './button';
import Search from '../search';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Users = async () => {
  const userList = await clerkClient.users.getUserList();
  const { rows } = await sql`Select * from admins;`;
  const adminIdList = rows.map((row) => row.id);
  const removeAdmins = userList.data.filter(
    (user) => !adminIdList.includes(user.id),
  );

  return (
    <div className="container mx-auto sm:p-4 bg-slate-700 p-8 rounded">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">User List</h2>
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <colgroup>
            <col className="w-20" />
            <col />
            <col />
            <col className="w-40" />
          </colgroup>
          <thead>
            <tr className="">
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">
                <Search />
              </th>
            </tr>
          </thead>
          <tbody className="border-b">
            {removeAdmins.map((user) => {
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
                    <PrivilegeButton id={user.id} />
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
