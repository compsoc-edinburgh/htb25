import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ArrowRight } from "lucide-react";
import { CodeSnippet } from "~/components/code-snippet";
import { CountdownTimer } from "~/components/countdown-timer";
import Link from "next/link";

const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdd_aRixgoGqsnhsZ7O92HZ4hEn0NhhL3xSUVCJwWtPVyq3tg/viewform?usp=send_form";

const CodeBlockBackground = () => {
  return (
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <div className="grid grid-cols-8 h-full w-full">
          {Array.from({length: 64}, (_, i) => {
            const row = Math.floor(i / 8);
            const isCorner = (row === 0 || row === 7) && (i % 8 === 0 || i % 8 === 7);
            const isBGWhite = !isCorner && Math.random() > row/8;
            return (
                <div
                    key={i}
                    className={`${isBGWhite ? "bg-white" : ""} h-full w-full`}
                />
            );
          })}
        </div>
      </div>
  );
};

export default function Page() {
  return (
      <main className="container mx-auto px-4 pb-8 space-y-8">
        <div className="flex flex-col items-center text-center mx-4 my-12 lg:mx-32 lg:my-26">
          <img src="/htb-logo.png" alt="HTB Logo" className="w-full h-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <Card className="bg-[#1a1a1a] border-none hidden lg:block lg:col-span-2">
            <CardContent className="p-4">
              <CodeSnippet />
            </CardContent>
          </Card>

          <Card className="bg-white text-black col-span-1 lg:col-span-3 relative">
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
                Lorem ipsum dolor sit amet. Qui molestias distinctio et unde laudantium aut ratione corrupti aut officiis laboriosam cum possimus aspernatur.
                Rem rerum nesciunt vel soluta deleniti qui enim tempore ut excepturi consectetur ut magnam quia est provident quia est omnis quidem.Et harum dolor
                ab accusamus facilis ut sunt assumenda vel explicabo ipsa nam numquam quos?
              </p>
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-tektur text-lg md:text-xl lg:text-2xl py-2 px-4">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#e67553] text-white col-span-1 group relative cursor-pointer transition-transform duration-300 hover:scale-105 border-0">
            <Link href="/signup" className="block h-full">
              <CardContent className="p-6 relative overflow-hidden h-full border-0">
                <CodeBlockBackground />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <ArrowRight className="w-8 h-8" />
                  <div>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold font-tektur">Register</p>
                    <p className="text-2xs md:text-xs lg:text-sm font-tektur">LIMITED SEATS</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-[#DFA8F6] to-[#DCFF03] text-black border-0">
            <CardContent className="p-6 flex">
              <div className="flex self-end flex-grow">
                <p className="text-lg md:text-xl lg:text-2xl font-bold font-tektur">Starting in:</p>
              </div>
              <div className="flex justify-end">
                <CountdownTimer />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#DFA8F6] text-black border-0">
            <CardContent className="p-6">
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-tektur">We Need More Hands!</h2>
                <div className="flex gap-12">
                  <p className="text-sm md:text-base lg:text-md font-tektur font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula</p>
                  <div className="flex justify-end">
                    <Button asChild className="bg-[#DCFF03] text-black hover:bg-black hover:text-[#DCFF03] transition-colors duration-200 font-tektur text-sm md:text-base lg:text-lg py-1 px-4 mt-2">
                      <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                        Volunteer
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
  );
}
