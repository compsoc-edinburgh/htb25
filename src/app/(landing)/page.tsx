import { LandingCard } from "~/components/modules/landing";
import { MailingListCards } from "~/components/modules/mailinglist";
import { FAQComponents } from "~/components/modules/landing/faq-section";
import { SponsorsComponents } from "~/components/modules/landing/sponsors-section";
import { auth } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { ApplicationStatusSection } from "~/components/application-status-section";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function Page() {
  const user = await auth();
  const application = await api.application.getUserApplication();


  return (
    <main className="w-full max-w-screen-xl space-y-8 px-4 py-20 md:mx-auto">
      <div className="mx-auto flex min-h-[calc(100dvh-32rem)] max-w-screen-lg flex-col items-center justify-center pb-20 text-center lg:min-h-[calc(100dvh-12rem)]">
        <img src="/HTB-logo.png" alt="HTB Logo" className="object-contain" />
        <button className="bg-accent-yellow text-black px-4 py-2 rounded-md text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5" strokeWidth={2.5} />
          <Link href="/documents/HTB-Attendee-Itinerary.pdf">Itinerary</Link>
        </button>
      </div>
      <div className="relative flex w-full flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300">
        <ApplicationStatusSection userId={user?.userId} application={application} />
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
