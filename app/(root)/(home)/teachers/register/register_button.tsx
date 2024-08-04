"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { createTeacherApplication } from "./actions";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="secondary" className="w-64" type="submit" aria-disabled={pending}>
            {pending ? "Registering..." : "Register Now"}
        </Button>
    );
}

export default function RegisterButton({ id }: { id: string }) {
    return (
        <form action={createTeacherApplication}>
            <input type="text" name="id" required hidden value={id} readOnly />
            <SubmitButton />
        </form>
    );
}