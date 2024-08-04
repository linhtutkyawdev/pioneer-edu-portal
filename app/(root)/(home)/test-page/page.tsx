import { sql } from "@vercel/postgres";

export default async function TestPage(): Promise<JSX.Element> {
    const { rows } = await sql`SELECT * from Teachers;`;

    return (
        <div>
            {rows.map((row) => (
                <div key={row.id}>
                    {row.id} - {row.name}
                </div>
            ))}
        </div>
    );
}