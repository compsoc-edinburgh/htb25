"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Country } from "~/components/ui/country-dropdown";
import { Team, User } from "@prisma/client";
import { University } from "~/components/ui/university-dropdown";
import { User2, Users2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CVStep from "./_steps/cv";
import UniversityYearStep from "./_steps/university-year";
import CountryStep from "./_steps/country";
import UniversityStep from "./_steps/university";
import NameStep from "./_steps/name";
import EmailStep from "./_steps/email";
import TeamStep from "./_steps/team";

import { countries } from "country-data-list";
import universities from "~/lib/constants/world_universities_and_domains.json";
import ReviewAndSubmitStep from "./_steps/review-submit";
import PortfolioStep from "./_steps/portfolio";
import PlacementsStep from "./_steps/placements";
import HackathonsStep from "./_steps/hackathons";
import ProjectStep from "./_steps/projects";
import ReimbursementStep from "./_steps/reimbursement";
import DietStep from "./_steps/diet";
import CalendarStep from "./_steps/calendar";
import ApplicationHeader from "./application-header";
import DoneStep from "./_steps/done";

export const GROUPED_STEPS = [
  {
    group: "About yourself",
    steps: ["team", "name", "country"],
  },
  {
    group: "Your university",
    steps: ["university", "university-year", "email"],
  },
  {
    group: "Your experience",
    steps: ["cv", "portfolio", "placements", "hackathons", "project"],
  },
  {
    group: "Let us make your experience better",
    steps: ["reimbursement", "calendar"],
  },
  {
    group: "Review and submit",
    steps: ["review", "done"],
  },
];

export const APPLICATION_STEPS = GROUPED_STEPS.flatMap((step) => step.steps);

export type ApplicationStep = (typeof APPLICATION_STEPS)[number];

export default function ApplicationForm({
  user,
}: {
  user: User & { team: Team | null };
}) {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<ApplicationStep>("team");

  const [applicationType, setApplicationType] = useState<
    "individual" | "team" | undefined
  >(user.team_id ? "team" : undefined);

  const [pronouns, setPronouns] = useState(user.pronouns ?? undefined);
  const [firstName, setFirstName] = useState(user.first_name ?? undefined);
  const [lastName, setLastName] = useState(user.last_name ?? undefined);
  const [email, setEmail] = useState(
    user.university_email ?? (user.email as string | undefined),
  );
  const [country, setCountry] = useState<Country | undefined>(
    countries.all.find((c) => c.alpha2 === user.country),
  );
  const [university, setUniversity] = useState<University | undefined>(
    universities.find((u) => u.name === user.university_name) || universities.find((u) => u.name === "University of Edinburgh"),
  );
  const [universityYear, setUniversityYear] = useState(
    user.university_year ?? undefined,
  );
  const [team, setTeam] = useState<Team | undefined>(user.team ?? undefined);
  const [cv, setCv] = useState(user.cv_url ?? undefined);
  const [portfolio, setPortfolio] = useState(user.portfolio_url ?? undefined);
  const [placements, setPlacements] = useState(
    user.placements_count ?? undefined,
  );
  const [hackathons, setHackathons] = useState(
    user.hackathons_count ?? undefined,
  );
  const [project, setProject] = useState(user.project_description ?? undefined);
  const [needsReimbursement, setNeedsReimbursement] = useState(
    user.needs_reimbursement ?? undefined,
  );
  const [travel, setTravel] = useState(user.travelling_from ?? undefined);
  const [diet, setDiet] = useState(user.dietary_restrictions ?? undefined);
  const [calendarEmail, setCalendarEmail] = useState(
    user.calendar_email ?? undefined,
  );

  useEffect(() => {
    if (searchParams.has("step")) {
      setStep((searchParams.get("step") as typeof step) ?? "team");
    }
  }, []);

  return (
    <div className="relative m-auto flex h-screen max-h-full w-full max-w-md flex-1 flex-col gap-3 rounded-xl bg-black/70 p-6 md:aspect-[9/16]">
      <ApplicationHeader
        applicationType={applicationType}
        team={team}
        currentStep={step}
      />

      <section className="flex flex-1 flex-col">
        {(step === "team" || !applicationType) && (
          <TeamStep
            team={team}
            setApplicationType={setApplicationType}
            setTeam={setTeam}
            setStep={setStep}
          />
        )}
        {step === "name" && (
          <NameStep
            pronouns={pronouns}
            firstName={firstName}
            lastName={lastName}
            setPronouns={setPronouns}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setStep={setStep}
          />
        )}
        {step === "country" && (
          <CountryStep
            country={country}
            setCountry={setCountry}
            setStep={setStep}
          />
        )}
        {step === "university" && (
          <UniversityStep
            country={country!}
            university={university}
            setUniversity={setUniversity}
            setStep={setStep}
          />
        )}
        {step === "university-year" && (
          <UniversityYearStep
            universityYear={universityYear}
            setUniversityYear={setUniversityYear}
            setStep={setStep}
          />
        )}
        {step === "email" && (
          <EmailStep
            university={university}
            email={email}
            setEmail={setEmail}
            setStep={setStep}
          />
        )}
        {step === "cv" && <CVStep cv={cv} setCv={setCv} setStep={setStep} />}
        {step === "portfolio" && (
          <PortfolioStep
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            setStep={setStep}
          />
        )}
        {step === "placements" && (
          <PlacementsStep
            placements={placements}
            setPlacements={setPlacements}
            setStep={setStep}
          />
        )}
        {step === "hackathons" && (
          <HackathonsStep
            hackathons={hackathons}
            setHackathons={setHackathons}
            setStep={setStep}
          />
        )}
        {step === "project" && (
          <ProjectStep
            project={project}
            setProject={setProject}
            setStep={setStep}
          />
        )}
        {step === "reimbursement" && (
          <ReimbursementStep
            needsReimbursement={needsReimbursement}
            setNeedsReimbursement={setNeedsReimbursement}
            travel={travel}
            setTravel={setTravel}
            setStep={setStep}
          />
        )}
        {/* {step === "diet" && (
          <DietStep diet={diet} setDiet={setDiet} setStep={setStep} />
        )} */}
        {step === "calendar" && (
          <CalendarStep
            universityEmail={email}
            calendarEmail={calendarEmail}
            setCalendarEmail={setCalendarEmail}
            setStep={setStep}
          />
        )}
        {step === "review" && (
          <ReviewAndSubmitStep
            user={{
              first_name: firstName,
              last_name: lastName,
              email: email,
              country: country?.name,
              university_name: university?.name,
              university_year: universityYear,
              team_id: team?.id,
              cv_url: cv,
              portfolio_url: portfolio,
              placements_count: placements,
              hackathons_count: hackathons,
              project_description: project,
              needs_reimbursement: needsReimbursement,
              travelling_from: travel,
              dietary_restrictions: diet,
              calendar_email: calendarEmail,
            }}
            setStep={setStep}
            applicationType={applicationType}
          />
        )}
        {step === "done" && <DoneStep />}
      </section>
    </div>
  );
}
