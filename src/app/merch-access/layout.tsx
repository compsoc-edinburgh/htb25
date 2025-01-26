import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import WebGLBackground from "~/components/gradient-background";

export default async function MerchAccessLayout({
  children,
}: Readonly<PropsWithChildren>) {

  return (
    <section className="w-screen flex flex-col items-center justify-center">
      <WebGLBackground />
      {children}
    </section>
  );
}
