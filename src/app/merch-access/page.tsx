"use client"

import { Terminal as TerminalIcon } from "lucide-react"
import { Card } from "~/components/ui/card"
import { Challenge, TerminalHeader, Terminal } from "~/components/modules/merch-access"

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
  const handleSolutionSubmit = (userInput: string) => {
    try {
      const input = userInput.trim()
      if (input === config.solution) {
        console.log("Access granted! You've successfully bypassed the security system.")
      } else {
        console.log("Access denied")
      }
    } catch {
      console.log("Access denied")
    }
  }

  if (true) {
    return (
      <div className="min-h-screen font-mono text-white">
        <div className="container py-8">
          <Card className="bg-black/60 backdrop-blur">
            <TerminalHeader />
            <div className="relative p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TerminalIcon className="h-6 w-6 text-accent-yellow" />
                  <span className="text-accent-yellow">$ Access Denied</span>
                </div>
                <p className="text-gray-300 font-mono">
                  $ <span className="text-red-500">The code challenge is currently locked.</span><br/>
                  $ Please check this page regularly for updates.<br/>
                  $ Contact an organizer if you believe this is an error.<br/>
                  $ System status: MAINTENANCE MODE<br/>
                  _
                </p>
              </div>
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
