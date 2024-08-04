"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { reCreateTeacherApplication } from "./actions";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="secondary" className="w-64" type="submit" aria-disabled={pending}>
            {pending ? "Registering..." : "Register Again"}
        </Button>
    );
}

export default function ReRegisterButton({ id }: { id: string }) {
    return (
        <form action={reCreateTeacherApplication}>
            <input type="text" name="id" required hidden value={id} readOnly />
            <SubmitButton />
        </form>
    );
}