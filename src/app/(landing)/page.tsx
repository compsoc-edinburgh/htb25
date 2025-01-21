import { LandingCard } from "~/components/modules/landing";

export default function Page() {
  return (
    <main className="mx-4 w-fit space-y-8 pb-8 md:mx-10">
      <div className="mx-4 my-12 flex flex-col items-center text-center lg:mx-32 lg:my-26">
        <img src="/htb-logo.png" alt="HTB Logo" className="h-full w-full" />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-1 order-2 md:col-span-3 lg:order-none lg:col-span-2">
          <LandingCard.CodeCard />
        </div>
        <div className="col-span-1 order-0 md:col-span-2 lg:order-none lg:col-span-3">
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
    </main>
  );
}
