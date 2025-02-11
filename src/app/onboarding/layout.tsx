import { PropsWithChildren } from "react";
import WebGLBackground from "~/components/gradient-background";

export default async function ApplyLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <WebGLBackground />
      {children}
    </>
  );
}
