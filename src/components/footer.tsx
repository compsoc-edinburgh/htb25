import { Linkedin, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="flex w-full flex-col items-center justify-center gap-8 rounded-lg bg-accent-yellow p-4 text-black">
        <div className="grid grid-cols-1 items-center justify-center gap-8 sm:gap-12 md:grid-cols-3">
          <div className="text-center md:text-left">
            <h3 className="text-md mb-4 font-semibold">Social Media</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/hacktheburgh"
                className="flex items-center justify-center gap-2 text-base md:text-lg underline hover:text-gray-600 md:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin /> LinkedIn
              </a>
              <a
                href="https://www.instagram.com/hacktheburgh"
                className="flex items-center justify-center gap-2 text-base md:text-lg underline hover:text-gray-600 md:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram /> Instagram
              </a>
            </div>
          </div>
          <Image
            src="/HB-icon.png"
            alt="HTB Logo"
            width={80}
            height={80}
            className="h-auto w-auto mx-auto"
          />
          <div className="text-center md:text-left">
            <h3 className="text-md mb-4 font-semibold">Contact</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@hacktheburgh.com"
                className="flex items-center justify-center gap-2 text-base md:text-lg underline hover:text-gray-600 md:justify-start"
              >
                <Mail /> Contact Us
              </a>
              <a
                href="mailto:communications@hacktheburgh.com"
                className="flex items-center justify-center gap-2 text-base md:text-lg underline hover:text-gray-600 md:justify-start"
              >
                <Mail /> Sponsor Us
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
        <a
          href="/documents/HTB-Privacy-Policy.pdf"
          className="hover:text-gray-300"
        >
          Privacy Policy
        </a>
        <span className="hidden sm:inline">•</span>
        <div>
          © {new Date().getFullYear()} Hack the Burgh. All rights reserved.
        </div>
      </div>
    </>
  );
}
