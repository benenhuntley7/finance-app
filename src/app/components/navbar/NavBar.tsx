// components/navbar/Navbar.tsx
"use client";
import "./style.css";
import Link from "next/link";
import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter, usePathname } from "next/navigation";

const routes: { title: string; href: string }[] = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
];

const signedInRoutes: { title: string; href: string }[] = [
  { title: "Profile", href: "/profile" },
  { title: "Shares", href: "/shares" },
  { title: "Assets", href: "/assets" },
  { title: "Expenses", href: "/expenses" },
  { title: "Income", href: "/income" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  //const { signOut } = useClerk();
  //const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const currentNavStyle = () => {
    const baseClass = "sticky top-0 z-50 border-b border-neutral-500";
    const conditionalClass = pathName === "/" ? "bg-transparent" : "bg-[#1E1E1E]";
    const combinedClass = `${baseClass} ${conditionalClass}`;

    return combinedClass;
  };

  return (
    <header id="navHeader" className={currentNavStyle()}>
      <div className="flex h-16 items-center justify-between px-6  lg:px-14">
        <div className="flex items-center">
          <Link href={"/"} className="shrink-0">
            <h1 className="text-slate-300 text-xl   font-semibold font-sans">Finance Advisor</h1>
          </Link>
          <div className="bg-background hidden w-full justify-end gap-1 px-4 py-2 sm:flex">
            <SignedIn>
              {signedInRoutes.map((route, index) => (
                <a
                  key={index}
                  href={route.href}
                  className={`text-slate-300 hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
                >
                  {route.title}
                </a>
              ))}
            </SignedIn>
            <SignedOut>
              {routes.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  className={`text-slate-300 hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
                >
                  {route.title}
                </Link>
              ))}
            </SignedOut>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <SignedIn>
            {/* <Link
              href="#"
              onClick={() => signOut(() => router.push("/dashboard"))}
              className={`text-slate-300 hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
            >
              Sign Out
            </Link> */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={` text-slate-300 hover:text-white-300 text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
            >
              Sign In
            </Link>
          </SignedOut>
        </div>

        {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}

        <button onClick={toggleMenu} className="sm:hidden pe-4 font-semibold text-slate-300">
          {menuOpen ? <p className="h-7 w-7">Close </p> : <p className="h-7 w-7">Menu</p>}
        </button>
      </div>
    </header>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <nav className="absolute right-0 top-16 flex h-[calc(100vh-70px)] w-2/5 flex-col z-50 bg-white border-x border-b border-slate-400">
      <div className="bg-background flex  w-full grow flex-col gap-1 px-4 pb-2 sm:hidden">
        <SignedOut>
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              onClick={toggleMenu}
              className={`hover:text-accent-foreground text-muted-foreground  inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
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
              className={`hover:text-accent-foreground text-muted-foreground inline-flex h-11 w-full items-center justify-end text-sm transition-colors sm:w-auto`}
            >
              {route.title}
            </Link>
          ))}
          <div className="bg-background absolute inset-x-0 bottom-0 w-100">
            <Link
              href="#"
              onClick={() => {
                signOut(() => router.push("/"));
                toggleMenu();
              }}
              className={`hover:text-accent-foreground  inline-flex h-10 w-full items-center justify-center text-sm tracking-widest text-red-500 font-medium transition-colors sm:w-auto`}
            >
              Sign Out
            </Link>
          </div>
        </SignedIn>
      </div>
      <div className="bg-background/60 h-screen w-full sm:hidden" />
    </nav>
  );
};

export default Navbar;
