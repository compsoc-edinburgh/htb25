"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Team, User } from "@prisma/client";

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState<OnboardingStep>("pronouns");

  const [pronouns, setPronouns] = useState(user.pronouns ?? undefined);
  const [diet, setDiet] = useState(user.dietary_restrictions ?? undefined);
  const [shirtSize, setShirtSize] = useState(user.shirt_size ?? undefined);
  const [meal1, setMeal1] = useState(user.food_choice_1 ?? undefined);
  const [meal2, setMeal2] = useState(user.food_choice_2 ?? undefined);
  const [meal3, setMeal3] = useState(user.food_choice_3 ?? undefined);
  const [pizza, setPizza] = useState(user.pizza_choice ?? undefined);

  if (showWelcome) {
    return (
      <div className="mx-auto flex max-w-screen-sm flex-col gap-4 p-6">
        <h1 className="text-4xl font-bold text-primary">Congratulations! 🎉</h1>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
          <p className="mb-4">Hey {user.first_name},</p>
          <p className="mb-4">
            Great news! We're thrilled to inform you that your application to
            HackTheBurgh has been accepted! Congratulations on being selected to
            join us for an amazing weekend of innovation, learning, and fun.
          </p>

          <div className="mt-6 rounded-md bg-primary/10 p-4">
            <h2 className="mb-4 text-xl font-semibold">Key Details:</h2>
            <ul className="flex flex-col gap-2">
              <li>
                📅 <strong>Date:</strong> 1st-2nd March
              </li>
              <li>
                📍 <strong>Location:</strong> The Nucleus Building, The
                University of Edinburgh King's Buildings Campus, Thomas Bayes
                Rd, Edinburgh EH9 3FG
              </li>
              <li>
                ⏰ <strong>Check-in Time:</strong> 9 am
              </li>
            </ul>
          </div>
          <p className="mb-4 mt-2 text-sm">
            We will re-send you these details closer to the event.
          </p>

          <h2 className="mb-2 text-xl font-semibold">What's Next?</h2>
          <p className="mb-4">
            Please confirm your attendance by filling out the form below by the
            14th Feb!
          </p>

          <h2 className="mb-2 text-xl font-semibold">Important Notes:</h2>
          <ul className="mb-4 flex flex-col gap-2">
            <li>
              • If you cannot attend, please let us know as soon as possible
            </li>
            <li>• Don't forget to bring your laptop and charger!</li>
            <li>
              • We'll provide meals, snacks, and plenty of coffee throughout the
              event
            </li>
            <li>
              • More detailed information about schedules and workshops will be
              sent in the coming weeks
            </li>
          </ul>

          <p className="mb-4">
            We can't wait to see what you'll create at HackTheBurgh! If you have
            any questions in the meantime, don't hesitate to reach out.
          </p>

          <p>
            Best regards,
            <br />
            The HackTheBurgh Team
          </p>
        </div>
        <Button className="mb-8 w-full" onClick={() => setShowWelcome(false)}>
          Continue to Registration Form
        </Button>
      </div>
    );
  }

  return (
    <div className="relative m-auto flex h-screen max-h-full w-full max-w-md flex-1 flex-col gap-3 rounded-xl bg-black/70 p-6 md:aspect-[9/16]">
      <p className="text-center text-2xl font-bold">Registration Form</p>
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
          <ShirtSizeStep
            shirtSize={shirtSize}
            setShirtSize={setShirtSize}
            setStep={setStep}
          />
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
