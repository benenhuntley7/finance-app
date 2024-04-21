import './style.css'
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
    <main id="formPage" className="min-h-custom overflow-hidden flex flex-col items-center sm:items-center lg:w-full p-14">
      <h1 className="text-slate-300 italic font-light tracking-widest my-6">Update Information: </h1>
      {!user ? (
        <Alert title="Welcome!" body="Complete your profile information below to get started..." type="success" />
      ) : (
        <></>
      )}
      <Form user={user} />
    </main>
  );
}
