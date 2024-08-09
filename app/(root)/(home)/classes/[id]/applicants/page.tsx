import { auth, clerkClient } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import AcceptButton from './accept_button';
import DenyButton from './deny_button';
import Search from '../../../../admin/search';
import Select from '../../../../admin/contact/select';
import { classData } from '../page';

const Teachers = async ({ classData }: { classData: classData }) => {
  const { rows } =
    await sql`Select * from student_applicants where class_id = ${classData.id}`;
  const pendingRows = rows.filter((row) => row.status === 'pending');
  const acceptedRows = rows.filter((row) => row.status === 'accepted');
  const rejectedRows = rows.filter((row) => row.status === 'rejected');

  const pendingUserList = await Promise.all(
    pendingRows.map((row) => clerkClient.users.getUser(row.student_id)),
  );
  const acceptedUserList = await Promise.all(
    acceptedRows.map((row) => clerkClient.users.getUser(row.student_id)),
  );
  const rejectedUserList = await Promise.all(
    rejectedRows.map((row) => clerkClient.users.getUser(row.student_id)),
  );

  return (
    <div className="container mx-auto sm:p-4 bg-slate-700 p-8 rounded text-white">
      <h2 className="mb-4 text-2xl font-semibold leading-tight flex justify-between">
        <div className="">"{classData.title}" Student Applications</div>
        <div className="">
          Accepted : {acceptedRows.length}/{classData.student_limit}
        </div>
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
                <Select values={['pending', 'accepted', 'rejected']} />
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
                      <AcceptButton
                        id={user.id}
                        class_id={classData.id}
                        warn={acceptedRows.length >= classData.student_limit}
                        warnMsg="Student limit has reached!!\nAre you sure you want to continue?"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <DenyButton
                        id={user.id}
                        class_id={classData.id}
                        warn
                        warnMsg="Are you sure you want to reject?"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="pending bg-slate-800 border-b-8 border-slate-700">
                <td colSpan={5} className="px-3 py-4 w-full">
                  No new student applications!
                </td>
              </tr>
            )}
            {acceptedUserList.length !== 0 ? (
              acceptedUserList.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="user-row accepted bg-slate-800 border-b-8 border-slate-700 hidden"
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
                      <DenyButton
                        id={user.id}
                        class_id={classData.id}
                        warn
                        warnMsg="Are you sure you want to reject?"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="accepted bg-slate-800 border-b-8 border-slate-700 hidden">
                <td colSpan={5} className="px-3 py-4 w-full">
                  No user have been accepted yet!
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
                      <AcceptButton
                        id={user.id}
                        class_id={classData.id}
                        warn={acceptedRows.length >= classData.student_limit}
                        warnMsg="Student limit has reached!!\nAre you sure you want to continue?"
                      />
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

const Students = async () => {
  return (
    <div className="container mx-auto sm:p-4 bg-slate-700 p-8 rounded text-white">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        This page is for teachers to view their course applications.
      </h2>
    </div>
  );
};

const Users = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) return null;
  const classData = (await sql`SELECT * FROM classes WHERE id = ${params.id}`)
    .rows[0] as classData;

  return classData.teacher_id === userId ? (
    <Teachers classData={classData} />
  ) : (
    <Students />
  );
};

export default Users;
