"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Country } from "~/components/ui/country-dropdown";
import { Team, User } from "@prisma/client";
import { University } from "~/components/ui/university-dropdown";
import { User2, Users2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { countries } from "country-data-list";
import universities from "~/lib/constants/world_universities_and_domains.json";

import OnboardingHeader from "./onboarding-header";
import PronounsStep from "./_steps/pronouns";
import DietStep from "./_steps/diet";
import DoneStep from "./_steps/done";
import Meal3Step from "./_steps/meal-3";
import Meal2Step from "./_steps/meal-2";
import Meal1Step from "./_steps/meal-1";
import PizzaStep from "./_steps/pizza";
import ShirtSizeStep from "./_steps/shirt-size";

export const GROUPED_STEPS = [
  {
    group: "Your pronouns",
    steps: ["pronouns"],
  },
  {
    group: "Dietary restrictions",
    steps: ["diet"],
  },
  {
    group: "T-shirt size",
    steps: ["shirt-size"],
  },
  {
    group: "Meal choices",
    steps: ["meal1", "meal2", "pizza", "meal3"],
  },
  {
    group: "Done",
    steps: ["done"],
  },
];

export const ONBOARDING_STEPS = GROUPED_STEPS.flatMap((step) => step.steps);

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export default function OnboardingForm({
  user,
}: {
  user: User & { team: Team | null };
}) {
  const [step, setStep] = useState<OnboardingStep>("pronouns");

  const [pronouns, setPronouns] = useState(user.pronouns ?? undefined);
  const [diet, setDiet] = useState(user.dietary_restrictions ?? undefined);
  const [shirtSize, setShirtSize] = useState(user.shirt_size ?? undefined);
  const [meal1, setMeal1] = useState(user.food_choice_1 ?? undefined);
  const [meal2, setMeal2] = useState(user.food_choice_2 ?? undefined);
  const [meal3, setMeal3] = useState(user.food_choice_3 ?? undefined);
  const [pizza, setPizza] = useState(user.pizza_choice ?? undefined);

  return (
    <div className="relative m-auto flex h-screen max-h-full w-full max-w-md flex-1 flex-col gap-3 rounded-xl bg-black/70 p-6 md:aspect-[9/16]">
      <p className="text-center text-2xl font-bold">Congratulations,  {user.first_name}!</p>
      <OnboardingHeader currentStep={step} />
      <section className="flex flex-1 flex-col">
        {step === "pronouns" && (
          <PronounsStep
            pronouns={pronouns}
            setPronouns={setPronouns}
            setStep={setStep}
          />
        )}
        {step === "diet" && (
          <DietStep diet={diet} setDiet={setDiet} setStep={setStep} />
        )}
        {step === "shirt-size" && (
          <ShirtSizeStep shirtSize={shirtSize} setShirtSize={setShirtSize} setStep={setStep} />
        )}
        {step === "meal1" && (
          <Meal1Step meal1={meal1} setMeal1={setMeal1} setStep={setStep} />
        )}
        {step === "meal2" && (
          <Meal2Step meal2={meal2} setMeal2={setMeal2} setStep={setStep} />
        )}
        {step === "pizza" && (
          <PizzaStep pizza={pizza} setPizza={setPizza} setStep={setStep} />
        )}
        {step === "meal3" && (
          <Meal3Step meal3={meal3} setMeal3={setMeal3} setStep={setStep} />
        )}

        {step === "done" && <DoneStep />}
      </section>
    </div>
  );
}
