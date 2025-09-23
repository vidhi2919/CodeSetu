"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void
  isLoading?: boolean
}

export function LoginForm({ onLogin, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ email, password })
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-card-foreground">Welcome Back</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Sign in to access your AYUSH dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-input border-border text-foreground"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-card-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-input border-border text-foreground"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center">
            <Button variant="link" className="text-secondary hover:text-secondary/80">
              Forgot your password?
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Not registered? <a href="/signup" className="text-secondary hover:underline">Sign up</a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
