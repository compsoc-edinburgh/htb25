import { api } from "~/trpc/server";
import ApplicationForm from "./application-form";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Navbar from "~/components/navbar";
import Link from "next/link";

export default async function ApplyPage() {
  const clerkUser = await currentUser();

  if (!clerkUser?.id) {
    redirect("/signup");
  }

  const application = await api.application.getUserApplication();

  // Had to do this here so that we don't have to deal with webhooks,
  // had a problem with saving the user in the db after social signin
  var user = await api.user.get();

  console.log(user);

  if (!user) {
    user = await api.user.create({
      clerkId: clerkUser?.id,
      email: clerkUser.primaryEmailAddress?.emailAddress as string,
    });
  }

  if (application) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 pt-20 pb-6 md:h-screen md:min-h-full md:pt-6">
      <Link href={"/"}>
        <img
          src="/HB-icon-neon-small.png"
          className="absolute left-0 top-0 z-50 m-6 hidden h-12 md:block"
        />
      </Link>
      <Link
        href={"/"}
        className="absolute md:hidden left-0 top-0 z-50 flex h-20 w-full items-center justify-center"
      >
        <img
          src="/HTB-logo.png"
          className="object-fit mx-auto block h-12 md:hidden"
        />
      </Link>
      <ApplicationForm user={user} />
    </div>
  );
}
