import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Dashboard from "./components/dashboard/Dashboard";
import Card from "./components/ui/card/Card";
import { getUser, getUsers } from "@/server/api/user";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const { userId, sessionClaims } = auth();

  const user = userId ? await getUser(userId) : null;

  /* if (userId) {
    const user = await getUser(userId);

    if (user) {
      // User is logged in and has profile information in the database.
    } else {
      // User has no profile information in the database. Re-direct to profile page.
      redirect("/profile");
    }
  } else {
    //redirect("/sign-in");
  } */

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
