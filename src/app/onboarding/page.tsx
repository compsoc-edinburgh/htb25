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

        <div className="mx-auto flex max-w-screen-sm flex-col gap-4">
          <h1 className="text-4xl font-bold text-primary">
            Congratulations! 🎉
          </h1>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <p className="mb-4">Hey,</p>
            <p className="mb-4">
              Great news! We're thrilled to inform you that your application to
              HackTheBurgh has been accepted! Congratulations on being selected
              to join us for an amazing weekend of innovation, learning, and
              fun.
            </p>

            <div className="my-6 rounded-md bg-primary/10 p-4">
              <h2 className="mb-4 text-xl font-semibold">Key Details:</h2>
              <ul className="flex flex-col gap-2">
                <li>
                  📅 <strong>Date:</strong> 1st-2nd March
                </li>
                <li>
                  📍 <strong>Location:</strong> The Nucleus Building, The
                  University of Edinburgh King's Buildings Campus, Thomas Bayes
                  Rd, Edinburgh EH9 3FG
                </li>
                <li>
                  ⏰ <strong>Check-in Time:</strong> 9 am
                </li>
              </ul>
            </div>

            <h2 className="mb-2 text-xl font-semibold">What's Next?</h2>
            <p className="mb-4">
              Please confirm your attendance by filling out the form below by
              the 14th Feb!
            </p>

            <h2 className="mb-2 text-xl font-semibold">Important Notes:</h2>
            <ul className="mb-4 flex flex-col gap-2">
              <li>
                • If you cannot attend, please let us know as soon as possible
              </li>
              <li>• Don't forget to bring your laptop and charger!</li>
              <li>
                • We'll provide meals, snacks, and plenty of coffee throughout
                the event
              </li>
              <li>
                • More detailed information about schedules and workshops will
                be sent in the coming weeks
              </li>
            </ul>

            <p className="mb-4">
              We can't wait to see what you'll create at HackTheBurgh! If you
              have any questions in the meantime, don't hesitate to reach out.
            </p>

            <p>
              Best regards,
              <br />
              The HackTheBurgh Team
            </p>
          </div>
        </div>

        {/* We need a continue button here to show the onboarding form!!!!!! */}

        {/* <div id="onboarding-form" className="mt-12">
          <OnboardingForm user={user} />
        </div> */}
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 pb-6 pt-20 md:h-screen md:min-h-full md:pt-6">
      <p>Check back later!</p>
    </div>
  );
}
