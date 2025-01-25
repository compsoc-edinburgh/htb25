import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

interface InfoItemProps {
  label: string;
  value: ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-medium text-muted-foreground">{label}</h2>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();
  const user = await api.user.get();

  return (
    <div className="mx-auto w-full max-w-screen-md py-40 px-10">
      {application && (
        <Card className="w-full max-w-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Application Details</CardTitle>
            <Button asChild>
              <Link href="/dashboard/application/edit">Edit</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem label="Status" value={application.status} />
              <InfoItem 
                label="Applied at" 
                value={application.created_at.toLocaleDateString()} 
              />
              {application.team && (
                <>
                  <InfoItem 
                    label="Team" 
                    value={application.team.name} 
                  />
                  <InfoItem 
                    label="Team Code" 
                    value={application.team.code} 
                  />
                </>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <InfoItem 
                label="First name" 
                value={user?.first_name} 
              />
              <InfoItem 
                label="Last name" 
                value={user?.last_name} 
              />
              <InfoItem 
                label="Country" 
                value={user?.country} 
              />
              <InfoItem 
                label="University" 
                value={user?.university_name} 
              />
              <InfoItem 
                label="University email" 
                value={user?.university_email} 
              />
              <InfoItem 
                label="University year" 
                value={user?.university_year} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              asChild 
              variant="outline" 
              className="w-full" 
              disabled={!user?.cv_url}
            >
              <a 
                href={user?.cv_url ?? "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Download CV"
              >
                Download CV
              </a>
            </Button>
          </CardFooter>
        </Card>
      )}
      {!application && (
        <div className="space-y-4 py-10 mx-10">
          <h2 className="text-xl font-semibold text-center md:text-left">No Application Found</h2>
          <p className="text-gray-600 text-center md:text-left">
            You haven&apos;t submitted an application for HackTheBurgh yet. Apply now to participate in Scotland&apos;s largest student hackathon!
          </p>
          <Button asChild className="bg-accent-yellow hover:bg-accent-yellow/80 w-full md:w-fit">
            <Link href="/apply" className="flex items-center gap-2">
              Start Application
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
