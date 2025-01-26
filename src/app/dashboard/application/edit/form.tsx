"use client"

import type { Application, Team, User } from "@prisma/client"
import { countries } from "country-data-list"
import { User2, Users2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { type Country, CountryDropdown } from "~/components/ui/country-dropdown"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { type University, UniversityDropdown } from "~/components/ui/university-dropdown"
import { UploadButton } from "~/components/uploadthing"

import universities from "~/lib/constants/world_universities_and_domains.json"
import { api } from "~/trpc/react"

interface EditApplicationFormProps {
  user: User & { team: Team | null }
  application: Application
}

export default function EditApplicationForm({ user, application }: EditApplicationFormProps) {
  const router = useRouter()
  const updateUser = api.user.update.useMutation()

  const [formState, setFormState] = useState({
    applicationType: user.team_id ? ("team" as const) : (undefined as "individual" | "team" | undefined),
    firstName: user.first_name ?? "",
    lastName: user.last_name ?? "",
    email: user.university_email ?? "",
    country: countries.all.find((c) => c.alpha2 === user.country) as Country | undefined,
    university: universities.find((u) => u.name === user.university_name) as University | undefined,
    universityYear: user.university_year ?? "",
    team: user.team ?? undefined,
    cv: user.cv_url ?? "",
  })

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCountryChange = useCallback((country: Country) => {
    setFormState((prev) => ({ ...prev, country, university: undefined }))
  }, [])

  const handleUniversityChange = useCallback((university: University) => {
    setFormState((prev) => ({ ...prev, university }))
  }, [])

  const handleUploadComplete = useCallback(
    async (res: any) => {
      const cvUrl = res[0]?.url
      if (cvUrl) {
        toast.success("Your file has been uploaded successfully.")
        await updateUser.mutateAsync({ cv: cvUrl })
        setFormState((prev) => ({ ...prev, cv: cvUrl }))
      }
    },
    [updateUser],
  )

  const handleUploadError = useCallback((error: Error) => {
    toast.error("Upload failed. Please try again.")
    console.error("Upload error:", error)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await updateUser.mutateAsync({
          firstName: formState.firstName,
          lastName: formState.lastName,
          universityEmail: formState.email,
          country: formState.country?.alpha2,
          university: formState.university?.name,
          universityYear: formState.universityYear,
          cv: formState.cv,
        })
        toast.success("Application updated successfully!")

        router.push("./")
      } catch (error) {
        toast.error("Failed to update application. Please try again.")
        console.error("Update error:", error)
      }
    },
    [formState, updateUser],
  )

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-lg flex-col gap-6 p-4 py-10 md:p-0">
      <div className="pb-12">
        {formState.applicationType === "individual" ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-xl md:text-2xl font-medium">
              <User2 /> Applying as an individual
            </div>
            <Button
              type="button"
              variant="outline"
              className="my-3 w-max rounded-2xl px-2 py-1 md:px-3 md:py-2 text-sm"
              onClick={() => setFormState((prev) => ({ ...prev, applicationType: undefined }))}
              size="sm"
            >
              <Users2 className="mr-2 h-4 w-4" /> Apply with a team instead
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xl md:text-2xl font-medium">
              <Users2 /> You're part of team{" "}
              <span className="mt-2 md:mt-0 rounded-full border border-accent-blue bg-accent-blue/10 px-4 py-2 md:px-5 md:py-3 shadow-sm">
                {formState.team?.name}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            required
            name="firstName"
            id="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            aria-describedby="firstName-error"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            required
            name="lastName"
            id="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            aria-describedby="lastName-error"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">University email</Label>
        <Input
          required
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={handleInputChange}
          aria-describedby="email-error"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="country">Country</Label>
        <CountryDropdown
          defaultValue={formState.country?.alpha3 ?? ""}
          onChange={handleCountryChange}
          aria-describedby="country-error"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="university">University</Label>
        <UniversityDropdown
          options={universities.filter((u) => u.alpha_two_code === formState.country?.alpha2)}
          defaultValue={formState.university?.name ?? ""}
          onChange={handleUniversityChange}
          aria-describedby="university-error"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="universityYear">University Year</Label>
        <Input
          required
          name="universityYear"
          id="universityYear"
          value={formState.universityYear}
          onChange={handleInputChange}
          aria-describedby="universityYear-error"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="cv" className="text-sm font-medium text-gray-700">
          Upload your CV
        </Label>
        {formState.cv ? (
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium text-white">CV Uploaded</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={formState.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                Preview CV
              </a>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setFormState((prev) => ({ ...prev, cv: "" }))}
                className="text-white hover:text-accent-yellow h-8 w-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : (
          <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            className="ut-button:rounded-xl ut-button:bg-primary ut-button:text-white ut-button:transition-colors ut-button:after:bg-primary ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-button:ut-uploading:bg-accent-foreground/30"
          />
        )}
      </div>
      <div className="flex pt-2">
        <Button type="submit" className="w-full  md:self-end" disabled={updateUser.isPending}>
          {updateUser.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}

