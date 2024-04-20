"use client";
import { useRouter } from "next/navigation"; // Usage: App router

export default function Page() {
  const router = useRouter();

  return (
    <button className="underline" type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  );
}
