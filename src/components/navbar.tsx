"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/#faq", label: "FAQs" },
    { href: "/team", label: "Team" },
    { href: "/sponsors", label: "Sponsors" },
    { 
      href: "https://2024.hacktheburgh.com",
      label: "HTB 2024",
      external: true 
    },
    { href: "/contact", label: "Contact" }
  ];

  const renderNavLinks = (mobile = false) => (
    navLinks.map(({ href, label, external }, index) => (
      <motion.div
        key={href}
        initial={mobile ? { opacity: 0, x: -20 } : {}}
        animate={mobile ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: mobile ? index * 0.1 : 0 }}
      >
        <Link
          href={href}
          className={mobile ? "text-white" : ""}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer"
          })}
        >
          {label}
        </Link>
      </motion.div>
    ))
  );

  const renderAuthSection = (mobile = false) => {
    if (!isLoaded) return <span className="text-gray-400">Loading...</span>;

    if (isSignedIn) {
      return (
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: mobile ? navLinks.length * 0.1 : 0 }}
        >
          <div className="flex justify-center items-center gap-4">
            <Link 
              href="/dashboard/application"
              className={mobile ? "text-white" : ""}
            >
              My Application
            </Link>
            {isAdmin && (
              <Link 
                href="/dashboard/admin"
                className={mobile ? "text-white" : ""}
              >
                Admin Dashboard
              </Link>
            )}
            <div className={mobile ? "pt-2" : ""}>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={mobile ? { opacity: 0, x: -20 } : {}}
        animate={mobile ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: mobile ? navLinks.length * 0.1 : 0 }}
        className={mobile ? "flex flex-col gap-4" : "flex items-center gap-8"}
      >
        <Button 
          asChild 
          className={`bg-accent-yellow hover:bg-accent-yellow/90 text-black ${
            mobile ? "w-full" : ""
          }`}
        >
          <Link href="/signup">Register</Link>
        </Button>
        {mobile ? (
          <Button 
            asChild 
            className="w-full bg-black hover:bg-black/90 text-white"
          >
            <Link 
              href="/signin"
              className="text-center text-white"
            >
              Sign In
            </Link>
          </Button>
        ) : (
          <Link 
            href="/signin"
            className="hover:text-gray-300 transition-colors"
          >
            Sign In
          </Link>
        )}
      </motion.div>
    );
  };

  return (
    <nav className="mx-4 md:mx-10 py-3">
      <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 md:px-6 py-3 font-medium text-white shadow backdrop-blur-2xl font-tektur">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" aria-label="Home">
            <img 
              src="/HB-icon-neon-small.png" 
              alt="HackBurgh Logo" 
              className="h-8 md:h-9 w-auto" 
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {renderNavLinks()}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {renderAuthSection()}
        </div>

        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.div>
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="md:hidden fixed top-[4.5rem] left-4 right-4 rounded-xl bg-white/10 backdrop-blur-2xl p-4 font-tektur z-50"
          >
            <div className="flex flex-col gap-4">
              {renderNavLinks(true)}
              {renderAuthSection(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
