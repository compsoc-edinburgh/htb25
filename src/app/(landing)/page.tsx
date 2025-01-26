import { LandingCard } from "~/components/modules/landing";
import { MailingListCards } from "~/components/modules/mailinglist";
import { FAQComponents } from "~/components/modules/landing/faq-section";
import { SponsorsComponents } from "~/components/modules/landing/sponsors-section";

export default function Page() {
  return (
    <main className="w-full max-w-screen-xl space-y-8 px-4 md:mx-auto">
      <div className="lg:my-26 mx-auto my-12 flex max-w-screen-lg flex-col items-center text-center">
        <img src="/HTB-logo.png" alt="HTB Logo" className="h-full w-full" />
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
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

      <section id="sponsors">
        <SponsorsComponents.SponsorsSection />
      </section>

      <section
        id="faq"
        className="mx-auto mt-16 w-full max-w-7xl rounded-lg border-2 bg-accent-yellow p-6 text-left"
      >
        <h2 className="mb-8 text-center font-bold text-black sm:text-xl md:text-2xl lg:text-3xl">
          You have questions, we have answers!
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {FAQComponents.FAQ_ITEMS.map((faq, index) => (
            <FAQComponents.FAQAccordionItem key={index} faq={faq} />
          ))}
        </div>
      </section>
    </main>
  );
}
