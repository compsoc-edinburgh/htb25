"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Application } from "@prisma/client";

export default function Navbar({
  isAdmin = false,
  application,
}: {
  isAdmin?: boolean;
  application?: Application | null;
}) {
  const { isSignedIn, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";

    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@hacktheburgh.com");
    toast.success("Email copied to clipboard");
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      const navHeight = 80; //estimate
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (isMenuOpen) {
        toggleMenu();
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const navLinks = [
    {
      href: "/#sponsors",
      label: "Sponsors",
    },
    {
      href: "/#faq",
      label: "FAQs",
    },
    {
      href: "https://2024.hacktheburgh.com",
      label: "HTB 2024",
      external: true,
    },
    {
      href: "mailto:hello@hacktheburgh.com",
      label: "Contact",
      external: true,
    },
  ];

  const renderNavLinks = (mobile = false) => (
    <div className={mobile ? "flex flex-col gap-2" : "flex items-center gap-1"}>
      {navLinks.map(({ href, label, external }, index) => (
        <motion.div
          key={href}
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: mobile ? index * 0.1 : 0, bounce: 0 }}
        >
          <Button
            asChild
            className="h-full w-full rounded-md bg-transparent px-5 py-2 font-semibold text-foreground hover:bg-black/90"
          >
            <Link
              href={href}
              {...(external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {label}
            </Link>
          </Button>
        </motion.div>
      ))}
    </div>
  );

  const renderAuthSection = (mobile = false) => {
    if (!isLoaded) return <span className="text-gray-400 pr-4">Loading...</span>;

    if (isSignedIn) {
      return (
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={
            mobile
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {}
          }
          transition={{ delay: mobile ? navLinks.length * 0.1 : 0, bounce: 0 }}
        >
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row pr-4">
            {application ? (
              <Button
                asChild
                className={`h-full rounded-md bg-accent-yellow px-5 py-2 text-black hover:bg-accent-yellow/90 ${
                  mobile ? "w-full" : ""
                }`}
              >
                <Link href="/dashboard" className={""}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              // <Button
              //   asChild
              //   className={`h-full rounded-md bg-accent-yellow px-5 py-2 text-black hover:bg-accent-yellow/90 ${
              //     mobile ? "w-full" : ""
              //   }`}
              // >
              //   <Link href="/apply" className={mobile ? "text-white" : ""}>
              //     Apply
              //   </Link>
              // </Button>
             <></>
            )}
            {isAdmin && (
              <Button
                asChild
                className="h-full w-full rounded-md bg-transparent px-5 py-2 font-semibold text-foreground hover:bg-black/90"
              >
                <Link
                  href="/dashboard/admin"
                  className={mobile ? "text-white" : ""}
                >
                  Admin
                </Link>
              </Button>
            )}
            <div className={"flex items-center " + mobile ? "pt-2" : ""}>
              <UserButton />
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div
        className={mobile ? "flex flex-col gap-2" : "flex items-center gap-1"}
      >
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: mobile ? navLinks.length * 0.1 : 0, bounce: 0 }}
        >
          {/* <Button
            asChild
            className={`h-full rounded-md bg-accent-yellow px-5 py-2 text-black hover:bg-accent-yellow/90 ${
              mobile ? "w-full" : ""
            }`}
          >
            <Link href="/signup">Register</Link>
          </Button> */}
        </motion.div>
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{
            delay: mobile ? navLinks.length * 0.1 + 0.1 : 0,
            bounce: 0,
          }}
        >
          <Button
            asChild
            className="h-full w-full rounded-md bg-transparent px-5 py-2 font-semibold text-foreground hover:bg-black/90"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <nav className="fixed top-3 z-50 flex h-14 w-[calc(100vw-2rem)] items-center justify-between rounded-2xl border border-border/10 bg-black/30 p-2 font-tektur font-medium text-white shadow backdrop-blur-xl md:w-[calc(100vw-16rem)]">
          <div className="flex items-center gap-4 pl-4 md:gap-8">
            <Link href="/" aria-label="Home">
              <img
                src="/HB-icon-neon-small.png"
                alt="HackBurgh Logo"
                className="h-8 w-auto md:h-9"
              />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {renderNavLinks()}
            </div>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {renderAuthSection()}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-black lg:hidden"
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
        </nav>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed inset-0 left-0 top-0 z-30 h-full w-full bg-black/50"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                bounce: 0,
              }}
              className="fixed left-4 right-4 top-[5rem] z-50 h-[calc(100dvh-5.75rem)] rounded-2xl border border-border/10 bg-black/20 p-4 font-tektur shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex h-full flex-col justify-between gap-2 pr-4">
                {renderNavLinks(true)}
                {renderAuthSection(true)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
