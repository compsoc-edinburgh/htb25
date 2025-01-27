"use client";

import { Team } from "@prisma/client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";

export default function CreateTeam({
  team,
  setTeam,
  setApplicationType,
  setStep,
  setJoined
}: {
  team?: Team;
  setTeam: Dispatch<SetStateAction<Team | undefined>>;
  setApplicationType: Dispatch<
    SetStateAction<"individual" | "team" | undefined>
  >;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
  setJoined: Dispatch<SetStateAction<boolean>>;
}) {
  const { updateSearchParam } = useSearchParamsHelper();

  const createTeam = api.team.create.useMutation();

  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const teamName = formData.get("teamName") as string;

    try {
      const newTeam = await createTeam.mutateAsync({
        teamName,
      });
      if (!newTeam) {
        toast.error("There was an error creating the team, please try again.");
        return;
      }
      setTeam(newTeam);
      toast.success("Team " + newTeam.name + " created successfully.");
      setJoined(true);
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new team</CardTitle>
        <CardDescription>
          Create your own team and invite your friends to join.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <span className="text-xs text-muted-foreground font-sans p-2">
              You can change this later
            </span>
            <Input
              id="teamName"
              defaultValue=""
              name="teamName"
              placeholder="Autobots"
            />
            
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" loading={loading}>
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
