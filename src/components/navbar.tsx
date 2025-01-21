"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav className="mx-10 py-3">
      <div className="flex items-center justify-between gap-16 rounded-2xl bg-white/10 px-6 py-3 font-medium text-white shadow backdrop-blur-2xl font-tektur">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Home">
            <img src="/HB-icon-neon-small.png" alt="HackBurgh Logo" className="h-9 w-auto" />
          </Link>
          <Link href="/#faq">FAQs</Link>
          <Link href="/team">Team</Link>
          <Link href="/sponsors">Sponsors</Link>
          <Link 
            href="https://2024.hacktheburgh.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTB 2024
          </Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex items-center gap-8">
          {!isLoaded && (
            <span className="text-gray-400">Loading...</span>
          )}
          {isLoaded && isSignedIn && (
            <>
              <Link href="/dashboard/application">My Application</Link>
              {isAdmin && (
                <Link href="/dashboard/admin">Admin Dashboard</Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          {isLoaded && !isSignedIn && (
            <>
              <Button 
                asChild 
                className="bg-accent-yellow hover:bg-accent-yellow/90 text-black"
              >
                <Link href="/signup">Register</Link>
              </Button>
              <Link href="/signin">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
