import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Dashboard from "./components/dashboard/Dashboard";
import Card from "./components/ui/card/Card";
import { getUser, getUsers } from "@/server/api/user";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth(); // get userId from Clerk
  const user = userId ? await getUser(userId) : null; // get user info from supabase using userId

  console.log(user);
  return (
    <main className="flex flex-col items-center justify-between p-10">
      {userId && !user && (
        <div className="mb-5">
          <span>
            You need to set up your profile on the{" "}
            <Link href="/profile" className="link">
              Profile
            </Link>{" "}
            page.
          </span>
        </div>
      )}
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          <Card title="Title" body="Body goes here" link="#" />
          <Card title="Docs" body="Documentation" link="#" />
          <Card title="Learn" body="Learn how to use the app. This link opens a new tab" link="#" target="_blank" />
        </div>
      </SignedOut>
    </main>
  );
}
