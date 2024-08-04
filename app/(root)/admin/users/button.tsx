"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { grantPrivileges } from "./actions";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="secondary" className="w-40" type="submit" aria-disabled={pending}>
            {pending ? "Granting..." : "Grant Previleges"}
        </Button>
    );
}

export default function PrivilegeButton({ id }: { id: string }) {
    return (
        <form action={grantPrivileges}>
            <input type="text" name="id" required hidden value={id} readOnly />
            <SubmitButton />
        </form>
    );
}