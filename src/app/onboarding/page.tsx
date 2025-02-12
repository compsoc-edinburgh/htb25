import { api } from "~/trpc/server";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import OnboardingForm from "./onboarding-form";
import Image from "next/image";
import { ApplicationStatus } from "@prisma/client";

export default async function ApplyPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/signin");
  }
  const user = await api.user.get();

  if (!clerkUser?.id || !user) {
    redirect("/signin");
  }

  const application = await api.application.getUserApplication();

  if (!application) {
    notFound();
  }

  if (application.status === ApplicationStatus.rejected) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 pb-6 pt-20 md:h-screen md:min-h-full md:pt-6">
        <div className="mx-auto flex max-w-screen-sm flex-col gap-4">
          <Image
            src="/HTB-logo.png"
            alt="HackTheBurgh Logo"
            width={300}
            height={100}
            className="mb-8 object-contain"
          />
          <p>Hey,</p>

          <p>
            Thank you so much for applying to HackTheBurgh! We appreciate the
            time and effort you put into your application.{" "}
          </p>

          <p>
            Unfortunately, due to the overwhelming number of strong applications
            we received this year and our limited capacity, we regret to inform
            you that we cannot offer you a place at this year's event.
          </p>

          <p>
            Please don't let this discourage you from applying to future
            hackathons or tech events. We encourage you to continue developing
            your skills and pursuing your interest in technology.
          </p>

          <p>
            We wish you the best in your future endeavours and hope to see your
            application again next year!
          </p>

          <p>
            Best regards,
            <br />
            The HackTheBurgh Team
          </p>
        </div>
      </div>
    );
  }

  if (application.status === ApplicationStatus.accepted) {
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

        <div id="onboarding-form" className="mt-12">
          <OnboardingForm user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 pb-6 pt-20 md:h-screen md:min-h-full md:pt-6">
      <p>Check back later!</p>
    </div>
  );
}
