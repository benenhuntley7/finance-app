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
    <main className="bg-gray-200 min-h-screen  flex flex-col items-left  p-10 sm:items-center  lg:w-1/4 ">
      <h1>Profile Page</h1>
      {!user ? (
        <Alert title="Welcome!" body="Complete your profile information below to get started..." type="success" />
      ) : (
        <></>
      )}
      <Form user={user} />
    </main>
  );
}
