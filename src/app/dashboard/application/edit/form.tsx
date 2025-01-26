"use client";
import { Application, Team, User } from "@prisma/client";
import { countries } from "country-data-list";
import { User2, Users2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Country, CountryDropdown } from "~/components/ui/country-dropdown";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  University,
  UniversityDropdown,
} from "~/components/ui/university-dropdown";
import { UploadButton } from "~/components/uploadthing";

import universities from "~/lib/constants/world_universities_and_domains.json";
import { api } from "~/trpc/react";

export default function EditApplicationForm({
  user,
  application,
}: {
  user: User & { team: Team | null };
  application: Application;
}) {
  const updateUser = api.user.update.useMutation();

  const [applicationType, setApplicationType] = useState<
    "individual" | "team" | undefined
  >(user.team_id ? "team" : undefined);

  const [firstName, setFirstName] = useState(user.first_name ?? undefined);
  const [lastName, setLastName] = useState(user.last_name ?? undefined);
  const [email, setEmail] = useState(user.university_email ?? undefined);
  const [country, setCountry] = useState<Country | undefined>(
    countries.all.find((c) => c.alpha2 === user.country),
  );
  const [university, setUniversity] = useState<University | undefined>(
    universities.find((u) => u.name === user.university_name),
  );
  const [universityYear, setUniversityYear] = useState(
    user.university_year ?? undefined,
  );
  const [team, setTeam] = useState<Team | undefined>(user.team ?? undefined);
  const [cv, setCv] = useState(user.cv_url ?? undefined);

  const handleUploadComplete = async (res: any) => {
    toast.success("Your file has been uploaded successfully.");
    await updateUser.mutateAsync({
      cv: res[0]?.url,
    });
    setCv(res[0]?.url);
  };

  const handleUploadError = (error: Error) => {
    toast.error(error.name);
    if (error.name === "FileSizeMismatchUploadThingError")
      toast.error("Your file size is too large. The maximum allowed is 4MB.");
    toast.error("There's something wrong, please try again later.");
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3 py-10">
      <div className="pb-10">
        {applicationType === "individual" ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-2xl font-medium">
              <User2 /> Applying as an individual
            </div>
            <Button
              variant={"outline"}
              className="my-2 w-max rounded-2xl px-3 py-2"
              onClick={() => {
                setApplicationType(undefined);
              }}
              size={"sm"}
            >
              <Users2 /> Apply with a team instead
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-2xl font-medium">
              <Users2 /> You're a part of team{" "}
              <span className="rounded-full border px-4 py-2 shadow-md">
                {team?.name}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            autoFocus
            name="firstName"
            id="firstName"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            name="lastName"
            id="lastName"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">University email</Label>
        <Input
          autoFocus
          name="email"
          id="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="country">Country</Label>
        <CountryDropdown
          defaultValue={country?.alpha3 ?? "GBR"}
          onChange={(c) => setCountry(c)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="university">University</Label>
        <UniversityDropdown
          options={universities.filter(
            (u) => u.alpha_two_code == country?.alpha2,
          )}
          defaultValue={university?.name}
          onChange={(u) => setUniversity(u)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="universityYear">University Year</Label>
        <Input
          name="universityYear"
          id="universityYear"
          defaultValue={universityYear}
          onChange={(e) => {
            setUniversityYear(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cv">Upload your CV</Label>
        {cv ? (
          <div className="flex items-center gap-3 py-3">
            <a
              className="text-blue-500 underline"
              href={cv}
              target="_blank"
              rel="noreferrer"
            >
              View uploaded CV
            </a>
            <Button onClick={() => setCv(undefined)}>Upload another</Button>
          </div>
        ) : (
          <UploadButton
            className="ut-button:rounded-xl ut-button:bg-primary ut-button:text-white ut-button:transition-colors ut-button:after:bg-primary ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-button:ut-uploading:bg-accent-foreground/30"
            endpoint="pdfUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        )}
      </div>
      <div className="flex">
        <Button className="self-end">
          Save
        </Button>
      </div>
    </div>
  );
}
