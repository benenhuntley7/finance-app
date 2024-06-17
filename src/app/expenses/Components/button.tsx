"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function Button ({ update = false } : { update?: boolean}) {
    const { pending } = useFormStatus();
    return (
        <button id="submit" name="submit" className="btn btn-primary btn-outline w-full">
            {pending ? (update ? "Updating..." : "Adding...") : update ? "Update" : "Add"}
        </button>
    )
}
