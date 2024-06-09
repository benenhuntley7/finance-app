import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex h-screen justify-center">
        <SignIn />
      </div>
    </>
  );
}
