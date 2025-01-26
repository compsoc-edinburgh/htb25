"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { z } from "zod";

const UnsubscribeForm = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(`${searchParams.get("email")}`);
  const [loading, setLoading] = useState(false);
  const token_from_link = searchParams.get("token");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const unsubscribeEmail = api.mailingList.unsubscribe.useMutation();
  const checkExisting = api.mailingList.checkExisting.useMutation();
  const checkToken = api.mailingList.checkToken.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const emailSchema = z.string().email("Invalid email address format.");
    try {
      emailSchema.parse(email);
      const exists = await checkExisting.mutateAsync(email);

      const token = await checkToken.mutateAsync(email);
      if (!exists) {
        toast.error(`Email address is already unsubscribed.`);
        setLoading(false);
      } else {
        if (token == token_from_link) {
          await unsubscribeEmail.mutateAsync(email).then(() => {
            setEmail("");
            setLoading(false);
            toast.success("Email has been unsubscribed successfully!");
          });
        } else {
          toast.error(
            `Please enter your correct email. You can only unsubscribe from your email.`,
          );
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setLoading(false);
        toast.error(error.errors[0]?.message || "Invalid email.");
      } else {
        setLoading(false);
        toast.error(`Couldn't unsubscribe your email due to: ${error}`);
      }
    }
  };

  return (
    <Suspense fallback="Loading...">
      <form
        onSubmit={handleSubmit}
        className="margin-auto flex items-center gap-2 p-10"
      >
        <Input
          type="email"
          placeholder="Email address.."
          className="basis-2/3 border-transparent bg-[#EEEEEE] font-tektur text-gray-700 md:text-xs lg:text-sm"
          value={email}
          onChange={handleEmailChange}
        ></Input>
        <Button
          type="submit"
          className="basis-1/3 bg-[#2A4FEE] font-tektur text-sm text-white hover:bg-blue-700 md:text-sm lg:text-xl"
          loading={loading}
        >
          Unsubscribe
        </Button>
      </form>
    </Suspense>
  );
};

export default UnsubscribeForm;
