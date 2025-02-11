import { api } from "~/trpc/server";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import OnboardingForm from "./onboarding-form";

export default async function ApplyPage() {
  const clerkUser = await currentUser();
  const user = await api.user.get();

  if (!clerkUser?.id || !user) {
    redirect("/signin");
  }

  const application = await api.application.getUserApplication();



  if (!application || application.status !== "accepted") {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 pb-6 pt-20 md:h-screen md:min-h-full md:pt-6">
      <Link href={"/"}>
        <img
          src="/HB-icon-neon-small.png"
          className="absolute left-0 top-0 z-50 m-6 hidden h-12 md:block"
        />
      </Link>
      <Link
        href={"/"}
        className="absolute left-0 top-0 z-50 flex h-20 w-full items-center justify-center md:hidden"
      >
        <img
          src="/HTB-logo.png"
          className="object-fit mx-auto block h-12 md:hidden"
        />
      </Link>
      <OnboardingForm user={user} />
    </div>
  );
}
