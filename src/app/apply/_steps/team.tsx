"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateTeam from "./create-team";
import JoinTeam from "./join-team";
import { Team } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function TeamStep({
  team,
  setApplicationType,
  setTeam,
  setStep,
}: {
  team?: Team;
  setApplicationType: Dispatch<
    SetStateAction<"individual" | "team" | undefined>
  >;
  setTeam: Dispatch<SetStateAction<Team | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const { user } = useUser();
  const { updateSearchParam } = useSearchParamsHelper();

  const leaveTeam = api.team.leave.useMutation();

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"individual" | "create" | "join">(
    team ? (team.created_by === user?.id ? "create" : "join") : "individual",
  );

  if (team) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team {team?.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-8">
          <CardDescription>
            You have {team.created_by === user?.id ? "created" : "joined"} the
            team {team?.name}. You can continue with your application.
          </CardDescription>
          <div className="space-y-2">
            <p className="font-sans text-sm text-muted-foreground">
              By sharing the code below, you can invite your friends to create a
              team of up to 6 members.
            </p>
            <div className="my-3 flex items-center space-x-2">
              <Label>Team code:</Label>
              <span className="inline-block rounded bg-muted p-1 px-3 font-mono text-white">
                {team.code}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-3">
          <Button
            variant={"destructive"}
            onClick={async (e) => {
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
                toast.error("There was something wrong, please try again.");
              }

              setLoading(false);
            }}
            loading={loading}
          >
            Leave team <LogOut />
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              updateSearchParam([{ name: "step", value: "name" }]);

              setApplicationType("team");
              setStep("name");
            }}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div>
      <Label>Team</Label>
      <p className="text-sm text-muted-foreground">
        Apply as an individual or as part of a team.
        <br />
        You can change this later.
      </p>
      <Tabs
        defaultValue={tab}
        className="w-full py-3"
        onValueChange={(t) => setTab(t as typeof tab)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="create">Create a team</TabsTrigger>
          <TabsTrigger value="join">Join a team</TabsTrigger>
        </TabsList>
        <TabsContent value="individual">
          <Card>
            <Button
              className="w-full"
              onClick={() => {
                updateSearchParam([{ name: "step", value: "name" }]);

                setApplicationType("individual");
                setStep("name");
              }}
            >
              Continue with individual application
            </Button>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <CreateTeam
            team={team}
            setTeam={setTeam}
            setApplicationType={setApplicationType}
            setStep={setStep}
            setJoined={setJoined}
          />
        </TabsContent>
        <TabsContent value="join">
          <JoinTeam
            team={team}
            setTeam={setTeam}
            setApplicationType={setApplicationType}
            setStep={setStep}
            setJoined={setJoined}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
