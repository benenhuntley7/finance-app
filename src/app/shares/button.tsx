import React from "react";
import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary btn-outline w-full">{pending ? "Adding Purchase..." : "Add Purchase"}</button>
  );
}
