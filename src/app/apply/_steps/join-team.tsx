"use client";

import { Team } from "@prisma/client";
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
import { ApplicationStep } from "../application-form";

export default function JoinTeam({
  team,
  setTeam,
  setApplicationType,
  setStep,
}: {
  team?: Team;
  setTeam: Dispatch<SetStateAction<Team | undefined>>;
  setApplicationType: Dispatch<
    SetStateAction<"individual" | "team" | undefined>
  >;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
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

      setTeam(res);
    } catch (e) {
      if (e instanceof Error && e.message === "NOTFOUND") {
        setErrors(["No team was found. Make sure you have the right code."]);
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
              className={cn(
                "w-full uppercase",
                errors.length
                  ? "border-destructive ring-4 ring-destructive/30"
                  : "",
              )}
            />
            {!!errors.length && (
              <ul className="px-2 py-1">
                {errors.map((error) => (
                  <li key={error} className="text-sm text-destructive">
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