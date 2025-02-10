import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function ApplicationsClosed() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 pb-6 pt-20 md:h-screen md:min-h-full md:pt-6">
      <h1 className="text-2xl font-bold">Applications were closed on 11/02/2025 at 12:00AM</h1>
      <p>
        If you've applied and want to check the status of your application,
        please <Link href="/dashboard" className="underline">sign in</Link>.
      </p>
    </div>
  );
}
