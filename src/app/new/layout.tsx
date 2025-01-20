import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import { Navbar } from "~/components/new-navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
        {children}
    </div>
  );
}

