import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { CodeSnippet } from "./code-snippet";
import { CountdownTimer } from "./countdown-timer";
import CodeBlockBackground from "./code-block-backgrond";
import { Button } from "../../ui/button";

const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdd_aRixgoGqsnhsZ7O92HZ4hEn0NhhL3xSUVCJwWtPVyq3tg/viewform?usp=send_form";

const RegisterCard = () => {
  return (
    <Card className="bg-[#e67553] text-white group relative cursor-pointer transition-transform duration-300 border-0 h-full">
      <CardContent className="p-6 relative overflow-hidden h-full border-0">
        <CodeBlockBackground />
      <div className="relative z-10 flex flex-row md:flex-col justify-between items-center md:items-start h-full">
        <div className="order-2 md:order-none">
          <ArrowRight className="w-8 h-8" />
        </div>
        <div className="order-1 md:order-none">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold font-tektur">Register</p>
          <p className="text-2xs md:text-xs lg:text-sm font-tektur">NOT OPEN YET</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CodeCard = () => (
  <Card className="bg-[#1a1a1a] border-none h-full">
    <CardContent className="p-4">
      <CodeSnippet />
    </CardContent>
  </Card>
);

const CountdownCard = () => (
  <Card className="bg-gradient-to-r from-[#DFA8F6] to-[#DCFF03] text-black border-0">
    <CardContent className="p-6 flex flex-col lg:flex-row h-full">
      <div className="flex mb-4 md:mb-0 lg:self-end lg:flex-grow">
        <p className="text-lg md:text-xl lg:text-2xl font-bold font-tektur">Starting in:</p>
      </div>
      <div className="flex justify-center lg:justify-end items-end">
        <CountdownTimer />
      </div>
    </CardContent>
  </Card>
);

const VolunteerCard = () => (
  <Card className="bg-[#DFA8F6] text-black border-0">
    <CardContent className="p-6">
      <div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-tektur">We Need More Hands!</h2>
        <div className="flex flex-col lg:flex-row justify-between">
          <p className="text-sm md:text-base lg:text-md font-tektur font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula</p>
          <div className="flex justify-end">
            <Button asChild className="bg-[#DCFF03] text-black hover:bg-black hover:text-[#DCFF03] transition-colors duration-200 font-tektur text-sm md:text-base lg:text-lg lg:py-1 px-4 w-full lg:w-fit mt-5 py-3">
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
  <Card className="bg-white text-black relative h-full">
    <div className="absolute inset-0 z-0">
      <img
        src="/logo_back.png"
        alt="Background Logo"
        className="w-full h-full object-cover opacity-50"
      />
    </div>
    <CardContent className="p-6 space-y-4 relative z-10">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-tektur">WELCOME TO HTB!</h2>
      <p className="text-base md:text-lg lg:text-xl">
        This September, join 1,000+ hackers from around the world for a hackathon like no other. Discover a community of like-minded hackers, connect with world-class mentors, and build because you love to build. At Hack the North 11, you're in for a great time with engaging workshops, fun activities, and the chance to network with the most exciting companies in tech!
      </p>
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-tektur mt-2 text-lg md:text-xl lg:text-2xl py-2 px-4 w-full md:w-fit">
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
