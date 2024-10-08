import { sql } from '@vercel/postgres';
import MarkAsReadButton from './mark_as_read_button';
import DeleteButton from './delete_button';
import Select from './select';
import CloseButton from './close_button';
import Search from '../../admin/search';

const AppliedClasses = async () => {
  const unreadContactRows = (
    await sql`Select * from contacts where is_read = false order by id;`
  ).rows;

  const readContactRows = (
    await sql`Select * from contacts where is_read = true order by id;`
  ).rows;

  return (
    <div className="container mx-auto sm:p-4 bg-slate-700 p-8 rounded text-white">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Messages</h2>
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <colgroup>
            <col />
            <col />
            <col className="w-full" />
            <col className="w-40" />
          </colgroup>
          <thead>
            <tr className="">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
              <th className="p-3">
                <Search />
              </th>
              <th className="p-3">
                <Select />
              </th>
            </tr>
          </thead>
          <tbody className="border-b">
            {unreadContactRows.map((r) => {
              return (
                <tr
                  key={r.id}
                  className="user-row unread bg-slate-800 border-b-8 border-slate-700"
                  data-name={r.name}
                >
                  <td className="px-3 py-2">
                    <p>{r.name}</p>
                  </td>
                  <td className="px-3 py-2">
                    <p>
                      <a href={`mailto:${r.email}`}>{r.email}</a>
                    </p>
                  </td>
                  <td className="px-3 py-2">
                    <details className="open detail">
                      <summary className="max-w-40 whitespace-nowrap text-ellipsis overflow-hidden">
                        {r.message}
                      </summary>
                      <div className="bg-slate-600 text-white rounded-md w-[60%] h-[70%] my-auto mx-auto absolute inset-0 p-4">
                        <h2 className="mb-4 text-2xl font-semibold leading-tight">
                          Message
                        </h2>
                        <p className="mb-4 text-wrap">{r.message}</p>
                        <CloseButton />
                        <div className="flex absolute bottom-4 right-4 gap-4">
                          <MarkAsReadButton id={r.id} />
                          <DeleteButton id={r.id} />
                        </div>
                      </div>
                    </details>
                  </td>
                  <td className="px-3 py-2">
                    <MarkAsReadButton id={r.id} />
                  </td>
                  <td className="px-3 py-2">
                    <DeleteButton id={r.id} />
                  </td>
                </tr>
              );
            })}
            {readContactRows.map((r) => {
              return (
                <tr
                  key={r.id}
                  className="user-row read hidden bg-slate-800 border-b-8 border-slate-700"
                  data-name={r.name}
                >
                  <td className="px-3 py-2">
                    <p>{r.name}</p>
                  </td>
                  <td className="px-3 py-2">
                    <p>
                      <a href={`mailto:${r.email}`}>{r.email}</a>
                    </p>
                  </td>
                  <td className="px-3 py-2">
                    <details className="open detail">
                      <summary className="max-w-60 whitespace-nowrap text-ellipsis overflow-hidden">
                        {r.message}
                      </summary>
                      <div className="bg-slate-600 text-white rounded-md w-[60%] h-[70%] my-auto mx-auto absolute inset-0 p-4">
                        <h2 className="mb-4 text-2xl font-semibold leading-tight">
                          Message
                        </h2>
                        <p className="mb-4 text-wrap">{r.message}</p>
                        <CloseButton />
                        <div className="flex absolute bottom-4 right-4 gap-4">
                          <DeleteButton id={r.id} />
                        </div>
                      </div>
                    </details>
                  </td>
                  <td className="px-3 py-2"></td>
                  <td className="px-3 py-2">
                    <DeleteButton id={r.id} />
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

export default AppliedClasses;
