import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import Footer from "~/components/footer";
import WebGLBackground from "~/components/gradient-background";
import Navbar from "~/components/navbar";

export default async function MerchAccessLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4 pt-20">
      <WebGLBackground />
      <Navbar isAdmin={user.sessionClaims?.metadata.role === "admin"} />
      {children}
    </section>
  );
}
