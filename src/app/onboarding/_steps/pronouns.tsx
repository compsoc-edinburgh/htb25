import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import { OnboardingStep } from "../onboarding-form";

export default function PronounsStep({
  pronouns,
  setPronouns,
  setStep,
}: {
  pronouns?: string;
  setPronouns: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<OnboardingStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const updateUser = api.user.update.useMutation();

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        pronouns: pronouns,
      });

      setStep("diet");
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
          <h2 className="text-xl font-medium">What are your pronouns?</h2>
          <p className="font-sans text-sm text-muted-foreground">
            This will appear on your entry pass later.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-6 py-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Select
              defaultValue={pronouns}
              onValueChange={(v) => setPronouns(v)}
            >
              <SelectTrigger>
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
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={!pronouns?.length || loading}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
