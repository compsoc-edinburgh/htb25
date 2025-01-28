import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/react"
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
      <html lang="en" className={`${tektur.variable} ${GeistSans.variable} dark`}>
        <body className="bg-black font-tektur">
          <Toaster position="bottom-center" toastOptions={{
            className: "rounded-full bg-background/70 backdrop-blur-xl border-none",
            classNames: {
              success: "bg-green-600/70",
              error: "bg-accent-red/70",
            }
          }} />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
