import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

export default function ReimbursementStep({
  needsReimbursement,
  setNeedsReimbursement,
  travel,
  setTravel,
  setStep,
}: {
  needsReimbursement?: boolean;
  setNeedsReimbursement: Dispatch<SetStateAction<boolean | undefined>>;
  travel?: string;
  setTravel: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "project",
      },
    ]);

    setStep("project");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        needsReimbursement: needsReimbursement,
        travellingFrom: travel,
      });

      updateSearchParam([
        {
          name: "step",
          value: "diet",
        },
      ]);

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
      className="flex h-full flex-col justify-between gap-3"
    >
      <div className="rounded-xl bg-muted p-4">
        <h2 className="text-xl font-medium">Reimbursement</h2>
        <p className="text-sm text-muted-foreground">
          Will you need your travel expenses reimbursed?
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Tabs
          className="flex h-full w-full flex-col"
          defaultValue={needsReimbursement ? "yes" : "no"}
        >
          <TabsList className="w-full">
            <TabsTrigger
              className="flex-1"
              value="yes"
              onClick={() => setNeedsReimbursement(true)}
            >
              Yes
            </TabsTrigger>
            <TabsTrigger
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
                className="flex-1 resize-none"
                defaultValue={travel}
                onChange={(e) => {
                  setTravel(e.target.value);
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="no"></TabsContent>
        </Tabs>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button loading={loading} type="submit" className="flex-1">
          Next
        </Button>
      </div>
    </form>
  );
}
