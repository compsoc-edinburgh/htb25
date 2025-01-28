import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export default function ProjectStep({
  project,
  setProject,
  setStep,
}: {
  project?: string;
  setProject: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "hackathons",
      },
    ]);

    setStep("hackathons");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        projectDescription: project,
      });

      updateSearchParam([
        {
          name: "step",
          value: "reimbursement",
        },
      ]);

      setStep("reimbursement");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const { aim, stack, link } = {
    aim: project?.split("\n")[0] ?? "",
    stack: project?.split("\n")[1] ?? "",
    link: project?.split("\n")[2] ?? "",
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-1 flex-col justify-between gap-3"
    >
      <div className="rounded-xl bg-muted p-4">
        <h2 className="text-xl font-medium">Project (optional)</h2>
        <p className="font-sans text-sm text-muted-foreground">
          Tell us about a completed project, the technologies you used, and any
          links you can send us. This field is optional but highly recommended
          and will affect application.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-col gap-6 py-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="aim">Project aim</Label>
            <Textarea
              autoFocus
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
