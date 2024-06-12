import "./style.css";
import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Alert from "../components/ui/alert/Alert";
import Form from "./form";

export default async function Profile() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  const user = await getUser(userId);

  return (
    <main className="min-h-custom overflow-hidden flex flex-col items-center p-6 w-full sm:items-center lg:w-full lg:p-14">
      <h1 className="text-slate-600 italic font-light tracking-widest my-6">
        Update Information:{" "}
      </h1>
      {!user ? (
        <Alert
          title="Welcome!"
          body="Complete your profile information below to get started..."
          type="success"
        />
      ) : (
        <Form user={user} />
      )}
    </main>
  );
}
