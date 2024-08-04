"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { rejectApplication } from "./actions";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" className="w-28" type="submit" aria-disabled={pending}>
            {pending ? "Rejecting..." : "Reject"}
        </Button>
    );
}

export default function DenyButton({ id }: { id: string }) {
    return (
        <form action={rejectApplication}>
            <input type="text" name="id" required hidden value={id} readOnly />
            <SubmitButton />
        </form>
    );
}