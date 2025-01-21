import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { CodeSnippet } from "./code-snippet";
import CodeBlockBackground from "./code-block-backgrond";
import { CountdownTimer } from "./countdown-timer";

const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdd_aRixgoGqsnhsZ7O92HZ4hEn0NhhL3xSUVCJwWtPVyq3tg/viewform?usp=send_form";

const RegisterCard = () => (
  <Card className="relative h-full col-span-1 cursor-pointer border-0 bg-accent-orange text-white transition-transform duration-300 group">
    <CardContent className="relative h-full overflow-hidden border-0 p-6">
      <CodeBlockBackground />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <ArrowRight className="h-8 w-8" />
        <div>
          <p className="font-tektur text-xl font-bold md:text-2xl lg:text-3xl">Register</p>
          <p className="font-tektur text-2xs md:text-xs lg:text-sm">NOT OPEN YET</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CodeCard = () => (
  <Card className="hidden h-full border-none bg-[#1a1a1a] lg:block lg:col-span-2">
    <CardContent className="p-4">
      <CodeSnippet />
    </CardContent>
  </Card>
);

const CountdownCard = () => (
  <Card className="border-0 bg-gradient-to-r from-accent-lilac to-accent-yellow text-black">
    <CardContent className="flex p-6">
      <div className="flex flex-grow self-end">
        <p className="font-tektur text-lg font-bold md:text-xl lg:text-2xl">Starting in:</p>
      </div>
      <div className="flex justify-end">
        <CountdownTimer />
      </div>
    </CardContent>
  </Card>
);

const VolunteerCard = () => (
  <Card className="border-0 bg-[#DFA8F6] text-black">
    <CardContent className="p-6">
      <div>
        <h2 className="mb-2 font-tektur text-lg font-semibold md:text-xl lg:text-2xl">We Need More Hands!</h2>
        <div className="flex justify-between">
          <p className="font-tektur text-sm font-light md:text-base lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula</p>
          <div className="flex justify-end">
            <Button asChild className="mt-2 bg-accent-yellow px-4 py-1 font-tektur text-sm text-black transition-colors duration-200 hover:bg-black hover:text-accent-yellow md:text-base lg:text-lg">
              <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Volunteer
              </a>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WelcomeCard = () => (
  <Card className="relative h-full border-0 col-span-1 bg-white text-black lg:col-span-3">
    <div className="absolute inset-0 z-0">
      <img
        src="/logo_back.png"
        alt="Background Logo"
        className="h-full w-full object-cover opacity-50"
      />
    </div>
    <CardContent className="relative z-10 space-y-4 p-6">
      <h2 className="font-tektur text-3xl font-semibold md:text-4xl lg:text-5xl">WELCOME TO HTB!</h2>
      <p className="text-base md:text-lg lg:text-xl">
        This September, join 1,000+ hackers from around the world for a hackathon like no other. Discover a community of like-minded hackers, connect with world-class mentors, and build because you love to build. At Hack the North 11, you're in for a great time with engaging workshops, fun activities, and the chance to network with the most exciting companies in tech!
      </p>
      <div className="flex justify-end">
        <Button className="mt-2 bg-blue-600 px-4 py-2 font-tektur text-lg text-white hover:bg-blue-700 md:text-xl lg:text-2xl">
          Get Started
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const LandingCard = {
  CodeCard,
  CountdownCard,
  RegisterCard,
  VolunteerCard,
  WelcomeCard,
} as const;
