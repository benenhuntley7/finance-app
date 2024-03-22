import Navbar from "@/app/components/navbar/NavBar";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <SignUp />
      </div>
    </>
  );
}
