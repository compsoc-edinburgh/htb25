import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import EditApplicationForm from "./form";
import WebGLBackground from "~/components/gradient-background";
import { ApplicationStatusSection } from "~/components/application-status-section";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();
  const user = await api.user.get();

  if (!application || !user) redirect("/apply");

  return (
    <div className="w-full py-20">
      <div className="relative mx-auto flex h-28 w-full max-w-screen-xl items-center justify-center overflow-hidden rounded-2xl text-center">
        <h1 className="text-center text-4xl font-bold">Your profile</h1>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col">
          <div className="relative flex w-full flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300">
            <ApplicationStatusSection
              userId={user.id}
              application={application}
            />
          </div>
          <EditApplicationForm user={user} />
        </div>
      </div>
    </div>
  );
}
