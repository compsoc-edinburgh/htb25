import { LandingCard } from "~/components/modules/landing";

export default function Page() {
  return (
    <main className="mx-10 pb-8 space-y-8">
      <div className="flex flex-col items-center text-center mx-4 my-12 lg:mx-32 lg:my-26">
        <img src="/htb-logo.png" alt="HTB Logo" className="w-full h-full" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <LandingCard.CodeCard />
        <LandingCard.WelcomeCard />
        <LandingCard.RegisterCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LandingCard.CountdownCard />
        <LandingCard.VolunteerCard />
      </div>
    </main>
  );
}
