import { Linkedin, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="flex w-full flex-col gap-4 rounded-lg bg-accent-yellow p-4 text-black shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 gap-8 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Image
                src="/HB-icon.png"
                alt="HTB Logo"
                width={60}
                height={60}
                className="h-auto w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Hack the Burgh
              </h2>
              <p className="text-gray-700 text-xs max-w-sm font-medium">
                A student hackathon at the University of Edinburgh.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h3 className="text-sm mb-3 font-bold text-gray-800 text-center sm:text-left">Connect With Us</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.linkedin.com/company/hacktheburgh"
                  className="flex items-center gap-2 text-xs hover:text-gray-600 transition-colors duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="p-1 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-200">
                    <Linkedin className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/hacktheburgh"
                  className="flex items-center gap-2 text-xs hover:text-gray-600 transition-colors duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="p-1 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-200">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">Instagram</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm mb-3 font-bold text-gray-800 text-center sm:text-left">Get in Touch</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:hello@hacktheburgh.com"
                  className="flex items-center gap-2 text-xs hover:text-gray-600 transition-colors duration-200 group"
                >
                  <span className="p-1 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-200">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">Contact Us</span>
                </a>
                <a
                  href="mailto:communications@hacktheburgh.com"
                  className="flex items-center gap-2 text-xs hover:text-gray-600 transition-colors duration-200 group"
                >
                  <span className="p-1 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-200">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">Sponsor Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-[10px] text-gray-400">
        <a
          href="/documents/HTB-Code-of-Conduct.pdf"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Code of Conduct
        </a>
        <span className="hidden sm:inline text-gray-500">•</span>
        <a
          href="/documents/HTB-Privacy-Policy.pdf"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <span className="hidden sm:inline text-gray-500">•</span>
        <div>
          © {new Date().getFullYear()} Hack the Burgh. All rights reserved.
        </div>
      </div>
    </>
  );
}
