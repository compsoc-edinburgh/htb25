"use client"

import { CheckIcon, Loader2, Terminal as TerminalIcon } from "lucide-react"
import { Card } from "~/components/ui/card"
import { Challenge, TerminalHeader, Terminal } from "~/components/modules/merch-access"
import { toast } from "sonner"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

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
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { data: challengeCompletion, isLoading: isCheckingCompletion } = api.user.getChallengeCompletion.useQuery();
  const utils = api.useUtils();
  const completeMutation = api.user.completeChallenge.useMutation({
    onSuccess: () => {
      void utils.user.getChallengeCompletion.invalidate();
    }
  });

  if (!isLoaded || isCheckingCompletion) {
    return (
      <div className="min-h-[calc(100vh-5rem)] w-full px-4 sm:px-6 font-mono text-white">
        <div className="py-4 sm:py-8">
          <Card className="bg-black/40 p-4 sm:p-8 backdrop-blur">
            <div className="space-y-4 sm:space-y-6 text-center">
              <Loader2 className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-accent-yellow animate-spin" />
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-[calc(100vh-5rem)] w-full px-4 sm:px-6 font-mono text-white">
        <div className="py-4 sm:py-8">
          <Card className="bg-black/40 p-4 sm:p-8 backdrop-blur">
            <div className="space-y-4 sm:space-y-6 text-center">
              <TerminalIcon className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-accent-yellow" />
              <h1 className="text-xl sm:text-2xl font-bold">Terminal Access Restricted</h1>
              <p className="text-sm sm:text-base text-gray-400">SECURITY PROTOCOL ACTIVE</p>
              <div className="my-4 sm:my-6 font-mono text-sm sm:text-base text-red-500">
                <p>! UNAUTHORIZED ACCESS DETECTED !</p>
                <p>Authentication required to proceed</p>
              </div>
              <button 
                onClick={() => router.push('/signin')}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-accent-yellow text-black rounded-lg hover:bg-accent-yellow/90 transition"
              >
                Authenticate Now
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (challengeCompletion) {
    return (
      <div className="min-h-[calc(100vh-5rem)] w-full px-4 sm:px-6 font-mono text-white">
        <div className="py-4 sm:py-8">
          <Card className="bg-black/40 p-4 sm:p-8 backdrop-blur">
            <div className="space-y-4 sm:space-y-6 text-center">
              <CheckIcon className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
              <h1 className="text-xl sm:text-2xl font-bold">Terminal Access Granted</h1>
              <p className="text-sm sm:text-base text-gray-400">Challenge completed successfully</p>
              <div className="my-4 sm:my-6 font-mono text-sm sm:text-base text-green-500">
                <p>Access request sent to terminal system</p>
                <p>Please wait for confirmation</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const handleSolutionSubmit = async (userInput: string) => {
    try {
      const input = userInput.trim()
      
      const result = await completeMutation.mutateAsync({ 
        solution: input,
      });

      if (!result.success) {
        toast.error(result.message)
        return;
      } 

      toast.success(result.message)
    } catch (error) {
      toast.error("Access Denied. Unexpected error.")
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] font-mono text-white">
      <div className="container px-4 sm:px-6 py-4 sm:py-8">
        <Card className="bg-black/40 p-4 sm:p-8 backdrop-blur">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <TerminalIcon className="h-5 w-5 sm:h-6 sm:w-6 text-accent-yellow" />
              <h1 className="text-lg sm:text-xl font-bold">Security System Challenge</h1>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Challenge.Description />
              <Challenge.Rules />
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base text-accent-yellow">Input Data:</h3>
                <pre className="text-xs sm:text-sm rounded-lg bg-black/60 p-3 sm:p-4">
                  <p className="whitespace-pre-wrap">Fragments: {config.fragments.join(', ')}</p>
                  <p className="whitespace-pre-wrap">Modulus: {config.modulus}</p>
                </pre>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base text-accent-yellow">Output example:</h3>
                <pre className="text-xs sm:text-sm rounded-lg bg-black/60 p-3 sm:p-4">
                  <p className="whitespace-pre-wrap">hack_the_burgh_xi:10_1234567890</p>
                </pre>
              </div>
            </div>
          </div>
        </Card>
              
        <Card className="mt-4 sm:mt-8 bg-black/60 p-0 backdrop-blur mb-4">
          <TerminalHeader />
          <div className="relative p-3 sm:p-4">
            <Terminal onSubmit={handleSolutionSubmit} />
          </div>
        </Card>
      </div>
    </div>
  )
}
