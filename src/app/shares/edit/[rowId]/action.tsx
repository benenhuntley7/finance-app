import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const updateChanges = async (formData: FormData) => {
  const { userId: user_id } = auth();

  if (!user_id) redirect("/login");
};
