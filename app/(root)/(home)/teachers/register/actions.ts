"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
    id: z.string({
        invalid_type_error: 'Invalid id',
    }).min(1),
});

export async function createTeacherApplication(
    formData: FormData,
) {
    const parse = schema.safeParse({
        id: formData.get("id"),
    });

    if (!parse.success) {
        return { message: "Failed to read id" };
    }

    const data = parse.data;

    try {
        await sql`INSERT INTO teacher_applicants (id, status) VALUES (${data.id}, 'pending');`;
        revalidatePath("/");
        // return { message: "Granted privileges" };
    } catch (e) {
        // return { message: "Failed to grant privileges" };
    }
}

export async function reCreateTeacherApplication(
    formData: FormData,
) {
    const parse = schema.safeParse({
        id: formData.get("id"),
    });

    if (!parse.success) {
        return { message: "Failed to read id" };
    }

    const data = parse.data;

    try {
        await sql`DELETE FROM teacher_applicants WHERE id = ${data.id};`;
        await sql`INSERT INTO teacher_applicants (id, status) VALUES (${data.id}, 'pending');`;
        revalidatePath("/");
        // return { message: "Granted privileges" };
    } catch (e) {
        // return { message: "Failed to grant privileges" };
    }
}