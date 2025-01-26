import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import EditApplicationForm from "./form";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();
  const user = await api.user.get();

  if (!application || !user) redirect("/apply");

  return (
    <div className="mx-auto w-full max-w-screen-md py-10">
      <div className="mx-auto pt-12">
        <div className="flex flex-col gap-12">
          <EditApplicationForm user={user} application={application} />
        </div>
      </div>
    </div>
  );
}
