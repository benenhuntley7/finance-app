import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Landing from "./components/landing/page";
import { getUser } from "@/server/api/user";
import { redirect } from "next/navigation";
import Link from "next/link";
import Alert from "./components/ui/alert/Alert";

export default async function Home() {
  const { userId } = auth(); // get userId from Clerk
  const user = userId ? await getUser(userId) : null; // get user info from supabase using userId
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-col items-center justify-between ">
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
      {/* <SignedIn>
        <Dashboard />
      </SignedIn> */}
      <SignedOut>
        <Landing />
      </SignedOut>
    </main>
  );
}
