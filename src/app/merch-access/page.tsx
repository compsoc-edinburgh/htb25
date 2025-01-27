"use client"

import { Loader2, Terminal as TerminalIcon } from "lucide-react"
import { Card } from "~/components/ui/card"
import { Challenge, TerminalHeader, Terminal } from "~/components/modules/merch-access"
import { toast } from "sonner"
import { api } from "~/trpc/react"
import { useRouter, redirect } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

interface ChallengeConfig {
  fragments: number[]
  modulus: number
  solution: string
}

const config: ChallengeConfig = {
  fragments: process.env.NEXT_PUBLIC_CODE_CHALLENGE_ONE_FRAGMENTS?.split(',').map(Number) || [],
  modulus: Number(process.env.NEXT_PUBLIC_CODE_CHALLENGE_ONE_MODULUS),
  solution: process.env.NEXT_PUBLIC_CODE_CHALLENGE_ONE || ''
}

export default function ChallengePage() {
  const { userId } = useAuth();
  const router = useRouter();
  const utils = api.useContext();
  const { data: userData, isLoading } = api.user.get.useQuery(undefined, {
    enabled: !!userId
  });

  const completeMutation = api.user.completeChallenge.useMutation({
    onSuccess: () => {
      utils.user.get.invalidate()
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen w-full font-mono text-white">
        <div className="py-8">
          <Card className="bg-black/40 p-8 backdrop-blur">
            <div className="space-y-6 text-center">
              <Loader2 className="mx-auto h-16 w-16 text-accent-yellow animate-spin" />
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="min-h-screen w-full font-mono text-white">
        <div className="py-8">
          <Card className="bg-black/40 p-8 backdrop-blur">
            <div className="space-y-6 text-center">
              <TerminalIcon className="mx-auto h-16 w-16 text-accent-yellow" />
              <h1 className="text-2xl font-bold">Terminal Access Restricted</h1>
              <p className="text-base text-gray-400">SECURITY PROTOCOL ACTIVE</p>
              <div className="my-6 font-mono text-base text-red-500">
                <p>! UNAUTHORIZED ACCESS DETECTED !</p>
                <p>Authentication required to proceed</p>
              </div>
              <button 
                onClick={() => router.push('/signin')}
                className="px-6 py-3 text-base bg-accent-yellow text-black rounded-lg hover:bg-accent-yellow/90 transition"
              >
                Authenticate Now
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const handleSolutionSubmit = async (userInput: string) => {
    try {
      const input = userInput.trim()
      if (input === config.solution) {
        toast.success("Access Granted! You've successfully bypassed the security system.")
        
        await completeMutation.mutateAsync()
      } else {
        toast.error("Access Denied. Invalid solution. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen font-mono text-white">
        <div className="container py-8">
          <Card className="bg-black/40 p-8 backdrop-blur">
            <div className="space-y-4 text-center">
              <h1 className="text-xl font-bold">Access Restricted</h1>
              <p>You need to register to access this challenge.</p>
              <button 
                onClick={() => router.push('/register')}
                className="px-4 py-2 bg-accent-yellow text-black rounded hover:bg-accent-yellow/90 transition"
              >
                Register Now
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-mono text-white">
      <div className="container py-8">
        <Card className="bg-black/40 p-8 backdrop-blur">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <TerminalIcon className="h-6 w-6 text-accent-yellow" />
              <h1 className="text-xl font-bold">Security System Challenge</h1>
            </div>

            <div className="space-y-4">
              <Challenge.Description />
              <Challenge.Rules />
              <div className="space-y-2">
                <h3 className="text-accent-yellow">Input Data:</h3>
                <pre className="text-xs md:text-sm rounded-lg bg-black/60 p-4 overflow-x-auto">
                  Fragments: {JSON.stringify(config.fragments)} <br />
                  Modulus: {config.modulus}
                </pre>
              </div>
            </div>
          </div>
        </Card>
              
        <Card className="mt-8 bg-black/60 p-0 backdrop-blur">
          <TerminalHeader />
          <div className="relative p-4">
            <Terminal onSubmit={handleSolutionSubmit} />
          </div>
        </Card>
      </div>
    </div>
  )
}
