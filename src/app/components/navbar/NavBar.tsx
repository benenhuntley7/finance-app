// components/navbar/Navbar.tsx
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const routes: { title: string; href: string }[] = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
];

const signedInRoutes: { title: string; href: string }[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Profile", href: "/profile" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { signOut } = useClerk();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className=" sticky top-0 z-50 bg-white ">
      <div className="flex h-16 items-center justify-between px-6 lg:px-14 border-b border-neutral-400">
        <div className="flex items-center">
          <Link href={"/"} className="shrink-0">
            <h1 className="text-accent-foreground text-2xl font-bold">financeApp</h1>
          </Link>
          <div className="bg-background hidden w-full justify-end gap-1 px-4 py-2 sm:flex">
            <SignedIn>
              {signedInRoutes.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
                >
                  {route.title}
                </Link>
              ))}
            </SignedIn>
            <SignedOut>
              {routes.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
                >
                  {route.title}
                </Link>
              ))}
            </SignedOut>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <SignedIn>
            <Link
              href="#"
              onClick={() => signOut(() => router.push("/"))}
              className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
            >
              Sign Out
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
            >
              Sign In
            </Link>
          </SignedOut>
        </div>

        {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}

        <button onClick={toggleMenu} className="sm:hidden">
          {menuOpen ? <p className="h-7 w-7">X </p> : <p className="h-7 w-7">Menu</p>}
        </button>
      </div>
    </header>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <nav className="absolute right-0 top-16 flex h-[calc(100vh-70px)] w-1/3 flex-col z-50 bg-neutral-200 border-x border-b border-neutral-400">
      <div className="bg-background  flex w-full grow flex-col gap-1 px-4 pb-2 sm:hidden">
        <SignedOut>
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              onClick={toggleMenu}
              className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
            >
              {route.title}
            </Link>
          ))}
          <Link
            href="/sign-in"
            onClick={toggleMenu}
            className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          {signedInRoutes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              onClick={toggleMenu}
              className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
            >
              {route.title}
            </Link>
          ))}
          <Link
            href="#"
            onClick={() => {
              signOut(() => router.push("/"));
              toggleMenu();
            }}
            className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
          >
            Sign Out
          </Link>
        </SignedIn>
      </div>
      <div className="bg-background/60 h-screen w-full sm:hidden" />
    </nav>
  );
};

export default Navbar;
