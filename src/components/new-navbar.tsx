import Link from "next/link"
import { Button } from "./ui/button"

export function Navbar() {
  const links = [
    { href: "/faq", label: "FAQ's" },
    { href: "/schedule", label: "Schedule" },
    { href: "/team", label: "Meet The Team" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/htb2023", label: "HTB 2023" },
    { href: "/contacts", label: "Contacts" },
  ]

  return (
    <nav>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm">
                {link.label}
              </Link>
            ))}
          </div>
          <Button asChild className="bg-black text-[#c8e029] hover:bg-[#c8e029] font-tektur border-2 border-[#c8e029] hover:text-white px-3 py-1 rounded-sm">
            <Link href="/signin">LOG IN</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
