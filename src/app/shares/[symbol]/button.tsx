import { useRouter } from "next/navigation"; // Usage: App router

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  );
}
