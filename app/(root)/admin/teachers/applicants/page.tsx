import { clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import Search from '../../search';
import AcceptButton from './accept_button';
import DenyButton from './deny_button';
import Select from '../../contact/select';

const Users = async () => {
  const { rows: pendingRows } =
    await sql`Select * from teacher_applicants where status = 'pending';`;
  const { rows: rejectedRows } =
    await sql`Select * from teacher_applicants where status = 'rejected';`;
  const pendingUserList = await Promise.all(
    pendingRows.map((row) => clerkClient.users.getUser(row.id)),
  );
  const rejectedUserList = await Promise.all(
    rejectedRows.map((row) => clerkClient.users.getUser(row.id)),
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
              <th className="p-3">
                <Search />
              </th>
              <th className="p-3">
                <Select values={['pending', 'rejected']} />
              </th>
            </tr>
          </thead>
          <tbody className="border-b">
            {pendingUserList.length !== 0 ? (
              pendingUserList.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="user-row pending bg-slate-800 border-b-8 border-slate-700"
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
                    <td className="px-3 py-3 flex justify-end">
                      <AcceptButton id={user.id} />
                    </td>
                    <td className="px-3 py-2">
                      <DenyButton id={user.id} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="pending bg-slate-800 border-b-8 border-slate-700">
                <td colSpan={5} className="px-3 py-4 w-full">
                  No new teacher applications!
                </td>
              </tr>
            )}
            {rejectedUserList.length !== 0 ? (
              rejectedUserList.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="user-row rejected bg-slate-800 border-b-8 border-slate-700 hidden"
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
                    <td />
                    <td className="px-3 py-3 flex justify-end">
                      <AcceptButton id={user.id} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="rejected bg-slate-800 border-b-8 border-slate-700 hidden">
                <td colSpan={5} className="px-3 py-4 w-full">
                  No user have been rejected yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
