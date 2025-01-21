import { LandingCard } from "~/components/modules/landing";

export default function Page() {
  return (
    <main className="mx-4 md:mx-10 pb-8 space-y-8 w-fit">
      <div className="flex flex-col items-center text-center mx-4 my-12 lg:mx-32 lg:my-26">
        <img src="/htb-logo.png" alt="HTB Logo" className="w-full h-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="order-2 lg:order-none col-span-1 md:col-span-3 lg:col-span-2">
          <LandingCard.CodeCard />
        </div>
        <div className="order-0 lg:order-none col-span-1 md:col-span-2 lg:col-span-3">
          <LandingCard.WelcomeCard />
        </div>
        <div className="order-1 lg:order-none">
          <LandingCard.RegisterCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LandingCard.CountdownCard />
        <LandingCard.VolunteerCard />
      </div>
    </main>
  );
}
