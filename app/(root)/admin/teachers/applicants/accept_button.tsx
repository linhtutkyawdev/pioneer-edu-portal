"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { grantPrivileges } from "./actions";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="secondary" className="w-28" type="submit" aria-disabled={pending}>
            {pending ? "Accepting..." : "Accept"}
        </Button>
    );
}

export default function AcceptButton({ id }: { id: string }) {
    return (
        <form action={grantPrivileges}>
            <input type="text" name="id" required hidden value={id} readOnly />
            <SubmitButton />
        </form>
    );
}