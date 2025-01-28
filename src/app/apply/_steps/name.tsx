import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useSearchParamsHelper } from "~/lib/helpers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function NameStep({
  pronouns,
  firstName,
  lastName,
  setPronouns,
  setFirstName,
  setLastName,
  setStep,
}: {
  pronouns?: string;
  firstName?: string;
  lastName?: string;
  setPronouns: Dispatch<SetStateAction<string | undefined>>;
  setFirstName: Dispatch<SetStateAction<string | undefined>>;
  setLastName: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();

  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "team",
      },
    ]);

    setStep("team");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        pronouns: pronouns,
        firstName,
        lastName,
      });

      updateSearchParam([
        {
          name: "step",
          value: "country",
        },
      ]);

      setStep("country");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-1 flex-col justify-between gap-6"
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="rounded-xl bg-muted p-4">
          <h2 className="text-xl font-medium">What is your name?</h2>
          <p className="font-sans text-sm text-muted-foreground">
            This will appear on your entry pass later.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-6 py-3">
          {/* <div className="flex flex-col gap-2">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Select
              defaultValue={pronouns}
              onValueChange={(v) => setPronouns(v)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              name="firstName"
              id="firstName"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              name="lastName"
              id="lastName"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={!firstName?.length || !lastName?.length || loading}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
