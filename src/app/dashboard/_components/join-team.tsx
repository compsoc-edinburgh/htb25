"use client";

import { Team, User } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
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
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useSearchParamsHelper } from "~/lib/helpers";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function JoinTeam({
  team,
  setTeam,
  setJoined,
}: {
  team?: Team & { members?: User[] };
  setTeam: Dispatch<
    SetStateAction<
      | (Team & {
          members?: User[];
        })
      | undefined
    >
  >;
  setJoined: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const joinTeam = api.team.join.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await joinTeam.mutateAsync({
        team_code: code,
      });
      if (!res) {
        toast.error("There was an error creating the team, please try again.");
        return;
      }

      setTeam(res);
      toast.success("Successfully joined team " + res.name);
    } catch (e) {
      if (e instanceof Error && e.message === "NOTFOUND") {
        setErrors(["No team was found. Make sure you have the right code."]);
      } else if (e instanceof Error && e.message === "TEAMFULL") {
        setErrors([
          "This team is full. We only allow up to 6 members per team. Would you like to create your own?",
        ]);
      } else {
        console.error(e);
      }
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a team</CardTitle>
        <CardDescription>
          Ask your friends for their team code and join their team.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="code">Team code</Label>
            <Input
              id="code"
              defaultValue=""
              onChange={(e) => setCode(e.target.value)}
              placeholder="XJSYY"
              data-error={errors.length > 0 ? "true" : undefined}
              className={cn("w-full uppercase")}
            />
            {!!errors.length && (
              <ul className="px-2 py-1">
                {errors.map((error) => (
                  <li key={error} className="text-sm text-accent-red">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" loading={loading}>
            Join
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
