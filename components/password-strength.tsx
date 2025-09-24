"use client"

import type React from "react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (password: string) => {
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
    }

    // Calculate score based on criteria
    if (checks.length) score += 20
    if (checks.lowercase) score += 20
    if (checks.uppercase) score += 20
    if (checks.numbers) score += 20
    if (checks.symbols) score += 20

    return { score, checks }
  }

  const { score, checks } = calculateStrength(password)

  const getStrengthText = (score: number) => {
    if (score === 0) return ""
    if (score <= 40) return "Weak"
    if (score <= 60) return "Fair"
    if (score <= 80) return "Good"
    return "Strong"
  }

  const getStrengthColor = (score: number) => {
    if (score <= 40) return "text-red-500"
    if (score <= 60) return "text-yellow-500"
    if (score <= 80) return "text-blue-500"
    return "text-green-500"
  }

  const getProgressColor = (score: number) => {
    if (score <= 40) return "bg-red-500"
    if (score <= 60) return "bg-yellow-500"
    if (score <= 80) return "bg-blue-500"
    return "bg-green-500"
  }

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Password strength</span>
        <span className={cn("text-sm font-medium", getStrengthColor(score))}>{getStrengthText(score)}</span>
      </div>
      <Progress
        value={score}
        className="h-2"
        style={
          {
            "--progress-background": getProgressColor(score),
          } as React.CSSProperties
        }
      />
      <div className="text-xs text-muted-foreground space-y-1">
        <div className={cn("flex items-center gap-2", checks.length ? "text-green-600" : "text-red-500")}>
          <span>{checks.length ? "✓" : "✗"}</span>
          At least 8 characters
        </div>
        <div className={cn("flex items-center gap-2", checks.lowercase ? "text-green-600" : "text-red-500")}>
          <span>{checks.lowercase ? "✓" : "✗"}</span>
          Lowercase letter
        </div>
        <div className={cn("flex items-center gap-2", checks.uppercase ? "text-green-600" : "text-red-500")}>
          <span>{checks.uppercase ? "✓" : "✗"}</span>
          Uppercase letter
        </div>
        <div className={cn("flex items-center gap-2", checks.numbers ? "text-green-600" : "text-red-500")}>
          <span>{checks.numbers ? "✓" : "✗"}</span>
          Number
        </div>
        <div className={cn("flex items-center gap-2", checks.symbols ? "text-green-600" : "text-red-500")}>
          <span>{checks.symbols ? "✓" : "✗"}</span>
          Special character
        </div>
      </div>
    </div>
  )
}
