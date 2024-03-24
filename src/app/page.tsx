import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Dashboard from "./components/dashboard/Dashboard";
import Card from "./components/ui/card/Card";
import { getUser, getUsers } from "@/server/api/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId, sessionClaims } = auth();

  if (userId) {
    const user = await getUser(userId);

    if (user) {
      // User is logged in and has profile information in the database.
    } else {
      // User has no profile information in the database. Re-direct to profile page.
      redirect("/profile");
    }
  } else {
    //redirect("/sign-in");
  }

  return (
    <main className="flex flex-col items-center justify-between p-10">
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
