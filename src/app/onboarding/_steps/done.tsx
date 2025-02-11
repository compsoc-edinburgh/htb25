"use client";

import { Check, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Confetti, ConfettiRef } from "~/components/ui/confetti";

export default function DoneStep() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-medium">Thank you!</h1>
      <p className="text-center font-sans">
        Your preferences have been saved. <br />See you on 1st of March!
      </p>
      <Button>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
