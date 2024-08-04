import { auth, currentUser } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import Profile from "../profile";
import RegisterButton from "./register_button";
import ReRegisterButton from "./re_register_button";

const Teachers = async () => {
    const { rows } = await sql`SELECT * from teacher_applicants;`;
    const { userId } = auth();

    if (!userId) return (
        <main className='text-gray-100 text-sm flex items-center justify-center h-80'>
            <span className="text-2xl mr-4 py-2 pr-4 border-r-[1px] border-gray-600">
                403
            </span>
            This page is forbidden. You need to login first to register as a teacher.
        </main>
    )

    const applicant = rows.filter((row) => row.id == userId);
    if (applicant.length > 0) {
        return (
            <section className="py-6 flex flex-col items-center">
                <p className="text-2xl font-bold">You are already registered!</p>
                <h3 className="text-lg font-bold pb-6">Your regestration status is <b>"{applicant[0].status}".</b></h3>
                <Profile id={userId} title="title" />
                {"pending" == (applicant[0].status) || <ReRegisterButton id={userId} />}
            </section>
        )
    }


    return (
        <section className="py-6 flex flex-col items-center">
            <Profile id={userId} title="title" />
            <RegisterButton id={userId} />
        </section>
    );
};

export default Teachers;
