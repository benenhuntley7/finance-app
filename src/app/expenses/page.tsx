import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import Month from "../components/Month";

export default async function Assets() {
  const { userId } = auth(); // get userId from Clerk
  const user = userId ? await getUser(userId) : null; // get user info from supabase using userId

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      <div className="flex flex-col w-full items-center md:w-2/3">
        <h1 className="flex font-bold my-5">Expenses</h1>
        <div>
          <Month />
        </div>
      </div>
    </main>
  );
}
