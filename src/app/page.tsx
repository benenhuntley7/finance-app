import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Dashboard from "./components/dashboard/Dashboard";
import Card from "./components/ui/card/Card";
import { getUser } from "@/server/api/user";
import Link from "next/link";
import Alert from "./components/ui/alert/Alert";

export default async function Home() {
  const { userId } = auth(); // get userId from Clerk
  const user = userId ? await getUser(userId) : null; // get user info from supabase using userId

  return (
    <main className="flex flex-col items-center justify-between p-10">
      {userId && !user && (
        <div className="mb-5">
          <Alert
            title="Welcome!"
            body={
              <>
                You need to fill out your profile on the{" "}
                <Link className="link" href="/profile">
                  Profile
                </Link>{" "}
                page to get started.
              </>
            }
            type="warning"
          />
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
