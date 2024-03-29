"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button id="submit" name="submit" className="btn btn-primary btn-outline w-1/4">
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
