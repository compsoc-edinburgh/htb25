import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Command, CommandItem, CommandList } from "~/components/ui/command";
import { cn } from "~/lib/utils";
import { OnboardingStep } from "../onboarding-form";

const options = [
  {
    value: "Margherita",
    label: "Margherita",
  },
  {
    value: "Pepperoni",
    label: "Pepperoni",
  },
  {
    value: "Aubergine (vg)",
    label: "Aubergine (vg)",
  },
  {
    value: "Wild Mushroom (vg)",
    label: "Wild Mushroom (vg)",
  },
  {
    value: "Buttermilk Chicken",
    label: "Buttermilk Chicken",
  },
];

export default function PizzaStep({
  pizza,
  setPizza,
  setStep,
}: {
  pizza?: string;
  setPizza: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<OnboardingStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    setStep("meal2");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        pizza: pizza,
      });

      setStep("meal3");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-1 flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-muted p-4">
          <h2 className="text-xl font-medium">Midnight Pizza</h2>
          <p className="font-sans text-sm text-muted-foreground">
            What pizza do you like for your midnight treat?
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Command
          className="w-full bg-transparent p-0"
          defaultValue={pizza}
        >
          <CommandList>
            {options.map((option, key) => (
              <CommandItem
                className={cn(
                  "my-1 flex w-full items-center gap-2 rounded-xl p-3 transition-colors",
                  option.value === pizza
                    ? "bg-accent-yellow text-black data-[selected=true]:bg-accent-yellow data-[selected=true]:text-black"
                    : "hover:bg-primary-50",
                )}
                key={key}
                onSelect={() => setPizza(option.value)}
              >
                <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {option.label}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={loading || !pizza}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
