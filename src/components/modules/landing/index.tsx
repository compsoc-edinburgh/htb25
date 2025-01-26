import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { CodeSnippet } from "./code-snippet";
import CodeBlockBackground from "./code-block-backgrond";
import { CountdownTimer } from "./countdown-timer";
import Link from "next/link";

const VOLUNTEER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdd_aRixgoGqsnhsZ7O92HZ4hEn0NhhL3xSUVCJwWtPVyq3tg/viewform?usp=send_form";

const RegisterCard = () => (
  <Link href="/apply">
    <Card className="group relative h-full cursor-pointer border-0 bg-accent-orange text-white transition-transform duration-300">
      <CardContent className="relative h-full overflow-hidden border-0 p-6">
        <CodeBlockBackground />
        <div className="relative z-10 flex h-full items-center justify-between md:flex-col md:items-start">
          <ArrowRight className="order-2 h-8 w-8 md:order-none" />
          <div className="order-1 md:order-none">
            <p className="font-tektur text-xl font-bold md:text-2xl lg:text-3xl">
              Register
            </p>
            <p className="text-2xs font-tektur md:text-xs lg:text-sm">
              Get your ticket!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const CodeCard = () => (
  <Card className="block h-full border-none bg-[#1a1a1a]">
    <CardContent className="p-4">
      <CodeSnippet />
    </CardContent>
  </Card>
);

const CountdownCard = () => (
  <Card className="border-0 bg-gradient-to-r from-accent-lilac to-accent-yellow text-black">
    <CardContent className="flex h-full flex-col p-6 lg:flex-row">
      <div className="flex flex-grow lg:self-end">
        <p className="font-tektur text-lg font-bold md:text-xl lg:text-2xl">
          Starting in:
        </p>
      </div>
      <div className="flex items-center justify-center">
        <CountdownTimer />
      </div>
    </CardContent>
  </Card>
);

const VolunteerCard = () => (
  <Card className="border-0 bg-[#DFA8F6] text-black">
    <CardContent className="p-6">
      <div>
        <h2 className="mb-2 font-tektur text-lg font-semibold md:text-xl lg:text-2xl">
          We Need More Hands!
        </h2>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <p className="lg:text-md font-tektur text-sm font-light md:text-base">
            Could be anything from photography, to social media, to anything
            related to helping out with the event!
          </p>
          <div className="flex justify-end">
            <Button
              asChild
              className="mt-4 w-full bg-accent-yellow px-4 py-2 font-tektur text-sm text-black transition-colors duration-200 hover:bg-black hover:text-accent-yellow md:text-base lg:mt-2 lg:w-fit lg:py-1 lg:text-lg"
            >
              <a
                href={VOLUNTEER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Volunteer
              </a>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WelcomeCard = () => {
  return (
    <Card className="relative h-full border-0 bg-white text-black">
      <div className="absolute inset-0 z-0">
        <img
          src="/logo_back.png"
          alt="Background Logo"
          className="h-full w-full object-cover opacity-50"
        />
      </div>
      <CardContent className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <h2 className="mb-4 font-tektur text-3xl font-semibold md:text-4xl lg:text-5xl">
            WELCOME TO HTB!
          </h2>
          <p className="text-base md:text-lg lg:text-xl">
            Hack The Burgh is back for its 11th year! Join us for a weekend of
            hacking, workshops, and fun in Edinburgh. Whether you're a seasoned
            hacker or just starting out, we have something for everyone.
          </p>
        </div>
        <div className="flex justify-end">
          <Button className="mt-2 w-full bg-blue-600 px-4 py-2 font-tektur text-lg text-white hover:bg-blue-700 md:text-xl lg:w-fit lg:text-2xl">
            <Link href="/apply">Get Started</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const LandingCard = {
  CodeCard,
  CountdownCard,
  RegisterCard,
  VolunteerCard,
  WelcomeCard,
} as const;
