"use client";

import { useUser } from "@clerk/nextjs";
import { Team, User } from "@prisma/client";
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

export default function CreateTeam({
  team,
  setTeam,
  setJoined,
}: {
  team?: Team & { members?: User[] };
  setTeam: Dispatch<
    SetStateAction<
      | (Team & {
          members?: Partial<User>[];
        })
      | undefined
    >
  >;
  setJoined: Dispatch<SetStateAction<boolean>>;
}) {
  const createTeam = api.team.create.useMutation();

  const [loading, setLoading] = useState(false);

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
