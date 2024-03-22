import { SignedIn, SignedOut } from "@clerk/nextjs";
import Dashboard from "./components/dashboard/Dashboard";
import Card from "./components/ui/card/Card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-10">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          <Card title="Title" body="Body goes here" />
          <Card title="Docs" body="Documentation" />
          <Card title="Learn" body="Learn how to use the app" />
        </div>
      </SignedOut>
    </main>
  );
}
