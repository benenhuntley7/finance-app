import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Profile() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div>Profile Page</div>
      <ProfileForm userId={userId} />
    </main>
  );
}

async function ProfileForm({ userId }: { userId: string }) {
  const user = await getUser(userId);

  if (!user) return;

  console.log(user);

  ("use client");
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col columns-1 gap-2">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full max-w-xs"
            defaultValue={user.firstName!}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full max-w-xs"
            defaultValue={user.lastName!}
          />
          <label className="input input-bordered flex items-center gap-2 max-w-xs w-full">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" defaultValue={user.email!} />
          </label>
        </div>
      </div>
    </>
  );
}
