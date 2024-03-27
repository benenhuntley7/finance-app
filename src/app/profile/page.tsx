import { getUser } from "@/server/api/user";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
import * as schema from "../../server/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function Profile() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  const user = await getUser(userId);

  const updateUser = async (formData: FormData) => {
    "use server";

    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;

    console.log(firstName, lastName, email);

    if (user) {
      const result = await db
        .update(schema.user)
        .set({ firstName: firstName, lastName: lastName, email: email })
        .where(eq(schema.user.id, userId));
    } else {
      const result = await db
        .insert(schema.user)
        .values({ id: userId, firstName: firstName, lastName: lastName, email: email });
    }

    revalidatePath("/profile");
  };

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div>Profile Page</div>
      <form className="w-full max-w-lg mt-5" action={updateUser}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="first-name"
              name="first-name"
              type="text"
              defaultValue={user?.firstName ? user.firstName : ""}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="last-name"
              name="last-name"
              type="text"
              defaultValue={user?.lastName ? user.lastName : ""}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              name="email"
              type="text"
              defaultValue={user?.email ? user.email : ""}
            />
            <p className="text-gray-600 text-xs italic">Location information:</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
              State
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="state"
                name="state"
              >
                <option>Australian Capital Territory</option>
                <option>New South Wales</option>
                <option>Northern Territory</option>
                <option>South Australia</option>
                <option>Tasmania</option>
                <option>Victoria</option>
                <option>Western Australia</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="postcode">
              Postcode
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="postcode"
              name="postcode"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-4 mb-6">
          <button id="submit" name="submit" className="btn btn-primary ">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
