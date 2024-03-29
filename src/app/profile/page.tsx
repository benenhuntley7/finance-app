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
    <main className="flex flex-col items-center justify-between p-10">
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
