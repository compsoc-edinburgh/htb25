import Link from "next/link";

export default async function ApplicationsClosed() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 md:h-screen md:min-h-full md:pt-6">
      <h1 className="text-xl md:text-2xl font-bold text-center">Applications were closed on 11/02/2025 at 12:00AM</h1>
      <p className="text-center text-sm md:text-base text-muted-foreground pt-2">
        If you've applied and want to check the status of your application,
        please <Link href="/dashboard" className="underline">sign in</Link>.
      </p>
    </div>
  );
}
