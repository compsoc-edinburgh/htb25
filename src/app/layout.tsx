import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { Tektur } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Hack The Burgh XI",
  description: "Hack The Burgh XI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const tektur = Tektur({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-tektur',
})

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.className} ${tektur.className} dark`}>
        <body>
          <Toaster />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
