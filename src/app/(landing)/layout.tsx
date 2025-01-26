import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import Footer from "~/components/footer";
import WebGLBackground from "~/components/gradient-background";
import Navbar from "~/components/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  return (
    <section className="pt-16">
      <WebGLBackground />
      <Navbar isAdmin={user.sessionClaims?.metadata.role === "admin"} />
      {children}
      <div className="mx-8 mt-16 mb-4">
        <Footer />
      </div>
    </section>
  );
}
