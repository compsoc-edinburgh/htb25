import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import universities from "~/lib/constants/world_universities_and_domains.json";
import { University } from "~/components/ui/university-dropdown";
import { Check, CheckCircle } from "lucide-react";

export default function EmailStep({
  email,
  university,
  setEmail,
  setStep,
}: {
  university?: University;
  email?: string;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string>();

  const [useCustomEmail, setUseCustomEmail] = useState(true);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "university-year",
      },
    ]);

    setStep("university-year");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser
        .mutateAsync({
          universityEmail: email,
        })
        .catch((err) => {
          if (err.data?.error === "email_in_use") {
            setError("This email is already in use.");
            return;
          }

          throw err;
        });

      updateSearchParam([
        {
          name: "step",
          value: "cv",
        },
      ]);

      setStep("cv");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const isUniEmail = (e = email) => {
    const domain = e?.split("@")[1] as string;
    if (!domain) return false;
    return university?.domains?.some((d) => domain.endsWith(d));
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-1 flex-col justify-between gap-3"
    >
      <div className="rounded-xl bg-muted p-4">
        <h2 className="text-xl font-medium">Your university email</h2>
        <p className="font-sans text-sm text-muted-foreground">
          We only accept current students. Please enter your university email
          and verify.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2">
          {!isUniEmail() && (
            <p className="font-sans text-sm">
              Your email{" "}
              <b className="font-sans">
                ({user?.primaryEmailAddress?.toString()})
              </b>{" "}
              does not seem to be from the university you selected. Please enter
              an email ending with{" "}
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
              autoFocus
              name="email"
              id="email"
              className={isUniEmail() ? "pl-9" : ""}
              data-error={error}
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
          {isUniEmail(user?.primaryEmailAddress?.toString()) && (
            <div>
              <Button
                size={"sm"}
                className="p-1 px-2 text-sm font-normal"
                type="button"
                variant={"outline"}
                onClick={() => setEmail(user?.primaryEmailAddress?.toString())}
              >
                Use {user?.primaryEmailAddress?.toString()}
              </Button>
            </div>
          )}
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
          disabled={loading || !isUniEmail()}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
