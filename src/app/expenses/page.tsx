import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
// import Month from "../components/Month";
import Form from "./form";

export default async function Expenses() {
  const { userId } = auth(); // get userId from Clerk
  const user = userId ? await getUser(userId) : null; // get user info from supabase using userId
  
  return (
    <main className="min-h-custom flex flex-col items-center justify-between px-2  lg:px-20">
      <div className="flex flex-col w-full items-center md:w-2/3">
        <h1 className="flex items-center font-bold my-5">Expenses</h1>
          <Form />
      </div>
    </main>
  );
}
