import { LandingCard } from "~/components/modules/landing";
import { MailingListCards } from "~/components/modules/mailinglist";
import { FAQComponents } from "~/components/modules/landing/faq-section";
import { SponsorsComponents } from "~/components/modules/landing/sponsors-section";
import { auth } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Page() {
  const user = await auth();
  const application = await api.application.getUserApplication();

  return (
    <main className="w-full max-w-screen-xl space-y-8 px-4 py-20 md:mx-auto">
      <div className="mx-auto flex min-h-[calc(100dvh-32rem)] max-w-screen-lg flex-col items-center justify-center pb-20 text-center lg:min-h-[calc(100dvh-12rem)]">
        <img src="/HTB-logo.png" alt="HTB Logo" className="object-contain" />
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-accent-yellow px-4 py-3 text-black">
        {user.userId ? (
          <>
            <span className="flex-1 text-center text-sm font-medium">
              <span>
                <span className="text-lg">Applications are closed</span>
                {application && application.status === "pending" && (
                  <span className="block pt-2 font-sans text-sm font-normal">
                    Thank you for applying, we'll let you know of your outcome.
                    You can view your application in the dashboard.
                  </span>
                )}
                {application && application.status === "accepted" && (
                  <span className="block pt-2 font-sans text-sm font-normal">
                    Congratulations on being accepted! You can view your
                    application in the dashboard.
                  </span>
                )}
              </span>
            </span>
            <Button className="" asChild>
              <Link href={"/dashboard"}>
                Dashboard <ArrowRight size={16} />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <span>
              <span className="text-lg">Applications are closed</span>
              <span className="block pt-2 font-sans text-sm font-normal">
                Check back again next year! If you've already applied, sign in
                to view your application.
              </span>
            </span>
            <Button className="" asChild>
              <Link href={"/dashboard"}>
                Sign in <ArrowRight size={16} />
              </Link>
            </Button>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div className="order-2 col-span-1 md:col-span-3 lg:order-none lg:col-span-2">
          <LandingCard.CodeCard />
        </div>
        <div className="order-0 col-span-1 md:col-span-2 lg:order-none lg:col-span-3">
          <LandingCard.WelcomeCard />
        </div>
        <div className="order-1 lg:order-none">
          <LandingCard.RegisterCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LandingCard.CountdownCard />
        <LandingCard.VolunteerCard />
      </div>

      <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-1 md:col-span-3 lg:col-span-2">
          <MailingListCards.MailingListInfoCard />
        </div>
        <div className="col-span-1 flex h-full flex-col space-y-2 md:col-span-3 lg:col-span-2">
          <MailingListCards.ArrowsCard arrowColor="white" cardColor="#2A4FEE" />
          <MailingListCards.ArrowsCard
            arrowColor="#2A4FEE"
            cardColor="#DFA8F6"
          />
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-2">
          <MailingListCards.MailingListInputCard />
        </div>
      </div>

      <section id="sponsors" className="scroll-mt-20">
        <SponsorsComponents.SponsorsSection />
      </section>

      <section className="mx-auto mb-28 w-full max-w-7xl scroll-mt-20" id="faq">
        <h2 className="mb-4 text-center font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          You have questions. We have answers!
        </p>
        <div className="flex flex-col items-center gap-6">
          {FAQComponents.FAQ_ITEMS.map((faq, index) => (
            <FAQComponents.FAQAccordionItem key={index} faq={faq} />
          ))}
        </div>
      </section>
    </main>
  );
}
