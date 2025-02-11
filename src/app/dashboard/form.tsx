"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { Team, User } from "@prisma/client";
import { countries } from "country-data-list";
import {
  Check,
  Edit3,
  ExternalLink,
  Info,
  Loader2,
  LogOut,
  MoreHorizontal,
  MoreVertical,
  TriangleAlert,
  User2,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Country, CountryDropdown } from "~/components/ui/country-dropdown";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import {
  University,
  UniversityDropdown,
} from "~/components/ui/university-dropdown";
import { UploadButton } from "~/components/uploadthing";

import universities from "~/lib/constants/world_universities_and_domains.json";
import { api } from "~/trpc/react";
import CreateTeam from "./_components/create-team";
import JoinTeam from "./_components/join-team";
import { OrganizationMembership } from "@clerk/nextjs/server";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function EditApplicationForm({
  user,
}: {
  user: User & {
    team:
      | (Team & {
          members?: Partial<User>[];
        })
      | null;
  };
}) {
  const { user: clerkUser } = useUser();
  const updateUser = api.user.update.useMutation();
  const renameTeam = api.team.rename.useMutation();
  const leaveTeam = api.team.leave.useMutation();

  const { signOut } = useClerk();

  const dialogRef = useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [dirtyToast, setDirtyToast] = useState<string | number>();
  const [isValid, setIsValid] = useState(false);
  const [joined, setJoined] = useState(false);

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
    universities.find((u) => u.name === user.university_name),
  );
  const [universityYear, setUniversityYear] = useState(
    user.university_year ?? undefined,
  );
  const [team, setTeam] = useState<
    | (Team & {
        members?: Partial<User>[];
      })
    | undefined
  >(user.team ?? undefined);
  const [cv, setCv] = useState(user.cv_url ?? undefined);
  const [portfolio, setPortfolio] = useState(user.portfolio_url ?? undefined);
  const [placements, setPlacements] = useState(
    user.placements_count ?? undefined,
  );
  const [hackathons, setHackathons] = useState(
    user.hackathons_count ?? undefined,
  );
  const [project, setProject] = useState(user.project_description ?? undefined);
  const { aim, stack, link } = {
    aim: project?.split("\n")[0],
    stack: project?.split("\n")[1],
    link: project?.split("\n")[2],
  };
  const [needsReimbursement, setNeedsReimbursement] = useState(
    user.needs_reimbursement ?? undefined,
  );
  const [travel, setTravel] = useState(user.travelling_from ?? undefined);
  const [calendarEmail, setCalendarEmail] = useState(
    user.calendar_email ?? undefined,
  );

  // Really ugly solution, change if have time
  useEffect(() => {
    const valid =
      !!firstName &&
      !!lastName &&
      !!email &&
      !!country?.alpha2 &&
      !!university?.name &&
      !!universityYear &&
      !!cv &&
      !!portfolio &&
      !!placements &&
      !!hackathons &&
      (needsReimbursement === false || !!travel) &&
      isUniEmail(email) === true;

    const dirty =
      firstName !== user.first_name ||
      lastName !== user.last_name ||
      email !== user.university_email ||
      country?.alpha2 !== user.country ||
      university?.name !== user.university_name ||
      universityYear !== user.university_year ||
      cv !== user.cv_url ||
      portfolio !== user.portfolio_url ||
      placements !== user.placements_count ||
      hackathons !== user.hackathons_count ||
      project !== (user.project_description ?? undefined) ||
      needsReimbursement !== (user.needs_reimbursement ?? undefined) ||
      travel !== (user.travelling_from ?? undefined) ||
      calendarEmail !== (user.calendar_email ?? undefined);

    setIsDirty(dirty);
    setIsValid(valid);

    if (!dirty && valid && dirtyToast) toast.dismiss(dirtyToast);
  }, [
    firstName,
    lastName,
    email,
    country,
    university,
    universityYear,
    cv,
    portfolio,
    placements,
    hackathons,
    project,
    needsReimbursement,
    travel,
    calendarEmail,
    user,
  ]);

  useEffect(() => {
    if (isDirty)
      setDirtyToast(
        toast.custom(
          (t) => (
            <div className="flex w-full items-center justify-between gap-3 rounded-full">
              <TriangleAlert size={17} />
              <span className="flex-1 text-sm font-medium">
                You have unsaved changes
              </span>
              <Button
                className="w-max"
                loading={loading}
                onClick={(e) => scrollToSection(e, "#save")}
              >
                Save
              </Button>
            </div>
          ),
          {
            className:
              "rounded-full w-full flex justify-between py-2 pl-4 pr-2 !bg-accent-red/70 backdrop-blur-xl  border-none",
            position: "bottom-center",
            duration: Infinity,
          },
        ),
      );
  }, [isDirty]);

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
    }
  };

  const isUniEmail = (e = email) => {
    const domain = e?.split("@")[1] as string;
    return university?.domains.includes(domain);
  };

  const handleUploadComplete = async (res: any) => {
    toast.success("Your file has been uploaded successfully.");
    setCv(res[0]?.url);
  };

  const handleUploadError = (error: Error) => {
    toast.error(error.name);
    if (error.name === "FileSizeMismatchUploadThingError")
      toast.error("Your file size is too large. The maximum allowed is 4MB.");
    toast.error("There's something wrong, please try again later.");
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateUser.mutateAsync({
        // pronouns,
        firstName,
        lastName,
        universityEmail: email,
        country: country?.alpha2,
        university: university?.name,
        universityYear,
        cv: cv,
        portfolioUrl: portfolio,
        placementsCount: placements,
        hackathonsCount: hackathons,
        projectDescription: project,
        needsReimbursement: needsReimbursement,
        travellingFrom: travel,
        calendarEmail: calendarEmail,
      });

      toast.dismiss(dirtyToast);
      toast.success("Your profile has been updated successfully.");
      setIsDirty(false);
      setIsValid(false);
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-3 py-10 lg:flex-row">
      <div className="flex w-full flex-col gap-6 lg:w-1/3">
        <div className="flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-accent-red px-4 py-3 text-white">
          <span className="flex-1 text-sm font-medium">
            <span>
              <span className="text-lg">Applications are closed</span>
              <span className="block pt-2 font-sans text-sm">
                You can no longer update your application. Feel free to contact
                us at hello@hacktheburgh.com if you have any concerns.
              </span>
            </span>
          </span>
        </div>
        <div className="w-full rounded-2xl bg-accent-yellow p-3 py-6 text-black">
          <div className="flex items-center justify-between gap-3">
            {clerkUser?.hasImage ? (
              <div className="aspect-square max-h-12 overflow-hidden rounded-full">
                <img src={clerkUser?.imageUrl} className="block object-cover" />
              </div>
            ) : (
              <UserIcon
                strokeWidth={0}
                className="bg-gradient aspect-square h-12 w-12 rounded-full bg-gradient-to-b from-muted to-muted fill-white stroke-muted p-2"
              />
            )}
            <span className="flex flex-1 flex-col">
              <span className="text-xl font-bold">
                {user.first_name} {user.last_name}
              </span>
              <span className="text-sm">{user.email}</span>
            </span>

            <Button
              variant={"secondary"}
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              Sign out <LogOut />
            </Button>
          </div>
          <div className="mt-3 pl-3 pt-2 font-medium">
            Application status:{" "}
            <span className="font-bold">Pending decision</span>
            <p className="pt-1 font-sans text-sm">
              We'll notify you about our decision by 17th February
            </p>
          </div>
        </div>
        <div className="relative h-max w-full overflow-hidden rounded-2xl bg-accent-lilac p-6 text-black">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium">Team {team?.name}</h2>
            {team && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <Dialog>
                    <DropdownMenuItem
                    disabled
                      onClick={(e) => {
                        // prevent closing the dialog when clicking the button
                        e.preventDefault();
                        dialogRef?.current?.click();
                      }}
                    >
                      <DialogTrigger disabled ref={dialogRef} asChild>
                        <div className="hidden"></div>
                      </DialogTrigger>
                      <Edit3 />
                      <span>Rename team</span>
                    </DropdownMenuItem>
                    <DialogContent className="sm:max-w-[425px]">
                      <form
                        action={(e) => {
                          try {
                            const name = e.get("name");

                            if (!name?.toString().length) {
                              toast.error("Name is required");
                              return;
                            }

                            renameTeam.mutate({
                              team_id: team.id,
                              name: name.toString(),
                            });

                            setTeam({ ...team, name: name.toString() });
                            toast.success("Team renamed to " + name);
                          } catch (err) {
                            console.error(err);
                            toast.error(
                              "There was something wrong, please try again.",
                            );
                          }
                        }}
                      >
                        <DialogHeader>
                          <DialogTitle>Rename your team</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="">
                              Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={team.name}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="submit">Save</Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuItem
                    onSelect={async (e) => {
                      e.preventDefault();
                      try {
                        setLoading(true);
                        await leaveTeam.mutateAsync({
                          team_id: team.id,
                        });
                        toast.success("You have left team " + team.name);
                        setTeam(undefined);
                      } catch (err) {
                        console.error(err);
                        toast.error(
                          "There was something wrong, please try again.",
                        );
                      }
                      setLoading(false);
                    }}
                    disabled
                  >
                    {loading ? (
                      <div className="animate-spin">
                        <Loader2 />
                      </div>
                    ) : (
                      <LogOut />
                    )}
                    <span>Leave team</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {!!team && (
            <div>
              <div className="py-3">
                Team code:{" "}
                <span className="inline-block rounded bg-muted p-1 px-3 font-mono text-white">
                  {team.code}
                </span>
                <p className="pt-2 font-sans text-sm">
                  <Info className="inline-block" size={17} /> Your friends can
                  use this code to join your team.
                </p>
              </div>
              <Label className="flex items-center gap-2">
                Members{" "}
                <span className="text-sm">
                  ({team?.members && `${team.members?.length} /  6`})
                </span>
              </Label>
              {(team?.members?.length ?? 0) < 4 && (
                <p className="mt-2 rounded-xl bg-accent-red p-3 font-sans text-sm leading-tight text-white">
                  You need at least 4 members in your team. Otherwise your
                  application will be dismissed.
                </p>
              )}
              <div className="flex flex-col gap-4 pt-3">
                {team?.members?.map((m) => (
                  <div key={m.id ?? m.first_name! + m.last_name!} className={`flex flex-col`}>
                    <span className="flex items-center gap-3">
                      <User2 size={18} />
                      <span>
                        {m.first_name} {m.last_name}{" "}
                        {m.id === team.created_by && "(Owner)"}
                      </span>
                    </span>
                  </div>
                ))}
                <div>
                  {/* <Button className="bg-accent-red text-white hover:bg-accent-red/80">
                    Leave team <LogOut />
                  </Button> */}
                </div>
              </div>
            </div>
          )}
          {!team && (
            <div>
              You are not part of a team
              <Tabs className="w-full py-3">
                <TabsList className="grid w-full grid-cols-2 gap-3">
                  <TabsTrigger disabled value="create">
                    Create a team
                  </TabsTrigger>
                  <TabsTrigger disabled value="join">
                    Join a team
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="create">
                  <CreateTeam
                    team={team}
                    setTeam={setTeam}
                    setJoined={setJoined}
                  />
                </TabsContent>
                <TabsContent value="join">
                  <JoinTeam
                    team={team}
                    setTeam={setTeam}
                    setJoined={setJoined}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-6 rounded-2xl bg-black/70 p-6 lg:w-auto">
        {/* <h1 className="text-2xl font-medium">Update your profile</h1> */}
        <div className="flex flex-col gap-6">
          {/* <div className="flex flex-col gap-2">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Select
              defaultValue={pronouns}
              onValueChange={(v) => setPronouns(v)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="he/him">he/him</SelectItem>
                  <SelectItem value="she/her">she/her</SelectItem>
                  <SelectItem value="they/them">they/them</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              disabled
              name="firstName"
              id="firstName"
              defaultValue={firstName}
              data-error={firstName ? undefined : "true"}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {!firstName && (
              <p className="font-sans text-sm text-accent-red">Required</p>
            )}
          </div>
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              disabled
              name="lastName"
              id="lastName"
              defaultValue={lastName}
              data-error={lastName ? undefined : "true"}
              onChange={(e) => setLastName(e.target.value)}
            />
            {!lastName && (
              <p className="font-sans text-sm text-accent-red">Required</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="country">University Country</Label>
            <CountryDropdown
              disabled
              defaultValue={country?.alpha3 ?? "GBR"}
              onChange={(c) => setCountry(c)}
            />
          </div>
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="university">University</Label>
            <UniversityDropdown
              disabled
              options={universities.filter(
                (u) => u.alpha_two_code == country?.alpha2,
              )}
              defaultValue={university?.name}
              onChange={(u) => setUniversity(u)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="universityYear">University Year</Label>
            <Select
              disabled
              defaultValue={universityYear}
              onValueChange={(v) => setUniversityYear(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="msc">MSc</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex max-w-md flex-col gap-2">
            {!isUniEmail() && (
              <p className="font-sans text-sm">
                Your email <b className="font-sans">({user?.email})</b> does not
                seem to be from the university you selected. Please enter an
                email ending with{" "}
                {university?.domains?.map((d, i, a) => (
                  <span key={d} className="font-sans font-bold">
                    {d}{" "}
                    {i === a.length - 2 ? " or " : i < a.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            <div className="relative">
              <Input
                disabled
                name="email"
                id="email"
                className={isUniEmail() ? "pl-9" : ""}
                data-error={isUniEmail() ? undefined : "true"}
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isUniEmail() && (
                <Check
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-green-600"
                />
              )}
            </div>
            {isUniEmail(user?.email) && (
              <div>
                <Button
                  size={"sm"}
                  className="p-1 px-2 text-sm font-normal"
                  type="button"
                  variant={"outline"}
                  onClick={() => setEmail(user?.email)}
                >
                  Use {user?.email}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="cv">Your CV</Label>
            {cv ? (
              <div className="flex items-center gap-3 py-3">
                <div className="flex items-center gap-3">
                  <Button asChild className="flex-1">
                    <a href={cv} target="_blank" rel="noreferrer">
                      View uploaded CV <ExternalLink />
                    </a>
                  </Button>
                  {/* <Button
                    type="button"
                    variant={"secondary"}
                    onClick={() => setCv(undefined)}
                  >
                    Change
                  </Button> */}
                </div>
              </div>
            ) : (
              <div>
                <UploadButton
                  disabled
                  className="ut-button:mx-0 ut-button:rounded-xl ut-button:bg-primary ut-button:text-black ut-button:transition-colors ut-button:after:bg-primary ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-button:ut-uploading:bg-accent-foreground/30"
                  endpoint="pdfUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
              </div>
            )}
          </div>
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="portfolio">Portfolio/LinkedIn link</Label>
            <Input
              disabled
              name="portfolio"
              id="portfolio"
              defaultValue={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="placements">
              Work experience (placements/internships)
            </Label>
            <Select
              disabled
              defaultValue={placements}
              onValueChange={(v) => setPlacements(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex max-w-md flex-1 flex-col gap-2">
            <Label htmlFor="hackathons">Hackathons attended</Label>
            <Select
              disabled
              defaultValue={hackathons}
              onValueChange={(v) => setHackathons(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex max-w-md flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-6 py-3">
            <Label htmlFor="aim">Tell us about a project you completed</Label>
            <span className="text-sm">(Optional but highly recommended)</span>
            <div className="flex flex-col gap-2">
              <Label htmlFor="aim">Project aim</Label>
              <Textarea
                disabled
                name="aim"
                id="aim"
                className="min-h-0 flex-1 resize-none"
                rows={2}
                defaultValue={aim}
                onChange={(e) =>
                  setProject(`${e.target.value}\n${stack ?? ""}\n${link ?? ""}`)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="stack">Tech stack</Label>
              <Textarea
                disabled
                name="stack"
                id="stack"
                rows={2}
                className="min-h-0 flex-1 resize-none"
                defaultValue={stack}
                onChange={(e) =>
                  setProject(`${aim ?? ""}\n${e.target.value}\n${link ?? ""}`)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="link">Link to project</Label>
              <Textarea
                disabled
                rows={2}
                name="link"
                id="link"
                defaultValue={link}
                className="min-h-0 flex-1 resize-none"
                onChange={(e) =>
                  setProject(`${aim ?? ""}\n${stack ?? ""}\n${e.target.value}`)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-6 py-3">
            <Label htmlFor="aim">
              Will you need your travel expenses reimbursed?
            </Label>
            <Tabs
              className="flex max-w-md flex-1 flex-col"
              defaultValue={needsReimbursement ? "yes" : "no"}
            >
              <TabsList className="w-full">
                <TabsTrigger
                  disabled
                  className="flex-1"
                  value="yes"
                  onClick={() => setNeedsReimbursement(true)}
                >
                  Yes
                </TabsTrigger>
                <TabsTrigger
                  disabled
                  className="flex-1"
                  value="no"
                  onClick={() => setNeedsReimbursement(false)}
                >
                  No
                </TabsTrigger>
              </TabsList>

              <TabsContent value="yes" asChild>
                <div className="mt-6 flex flex-1 flex-col gap-2">
                  <Label htmlFor="travel">
                    Please provide the details of your travel
                  </Label>
                  <Textarea
                    name="travel"
                    id="travel"
                    className="h-full flex-1"
                    defaultValue={travel}
                    onChange={(e) => {
                      setTravel(e.target.value);
                    }}
                    data-error={travel ? undefined : "true"}
                    required
                  />
                  {!travel && (
                    <p className="font-sans text-sm text-accent-red">
                      Required
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="no"></TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-6 py-3">
            <Label htmlFor="aim">
              Would you like to be added to our joint calendar?
            </Label>
            <Tabs className="max-w-md" defaultValue={"yes"}>
              <TabsList className="w-full">
                <TabsTrigger className="flex-1" value="yes" disabled>
                  Yes
                </TabsTrigger>
                <TabsTrigger
                  disabled
                  className="flex-1"
                  value="no"
                  onClick={() => {
                    setCalendarEmail(undefined);
                  }}
                >
                  No
                </TabsTrigger>
              </TabsList>

              <TabsContent value="yes">
                <div className="mt-6 flex flex-col gap-2">
                  <Label htmlFor="travel">Which email should we use?</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size={"sm"}
                      disabled
                      type="button"
                      variant={"secondary"}
                      onClick={() => setCalendarEmail(user?.email?.toString())}
                    >
                      Use {user?.email?.toString()}
                    </Button>
                    <Button
                      size={"sm"}
                      disabled
                      variant={"secondary"}
                      type="button"
                      onClick={() => setCalendarEmail(email)}
                    >
                      Use {email}
                    </Button>
                  </div>
                  <Input
                    disabled
                    name="travel"
                    id="travel"
                    value={calendarEmail}
                    onChange={(e) => {
                      setCalendarEmail(e.target.value);
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="no"></TabsContent>
            </Tabs>
          </div>
        </div>
        {isDirty && !isValid && (
          <div className="rounded-xl">
            <div className="flex items-center gap-3">
              <TriangleAlert size={17} className="text-accent-red" />
              <span className="flex-1 text-sm font-medium text-accent-red">
                Please check your answers
              </span>
            </div>
          </div>
        )}
        <div className="flex w-full" id="save">
          <Button
            className="w-full max-w-md self-end"
            type="button"
            loading={loading}
            disabled={!isValid || !isDirty}
            onClick={() => handleUpdate()}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
