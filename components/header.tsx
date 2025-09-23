"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Globe, Menu, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ayush_user")
      if (stored) {
        const parsed = JSON.parse(stored)
        setIsLoggedIn(Boolean(parsed?.loggedIn))
      } else {
        setIsLoggedIn(false)
      }
    } catch (_) {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("ayush_user")
    } catch (_) {}
    setIsLoggedIn(false)
    router.push("/")
    router.refresh?.()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 h-16 items-center">
        {/* Left: Logo + version */}
        <div className="flex items-center gap-4 col-start-1 col-end-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">AYUSH-ICD11</h1>
              <p className="text-xs text-muted-foreground">Interoperability Platform</p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            v2.1.0
          </Badge>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center justify-center gap-10 col-start-2 col-end-3">
  <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
    Diseases
  </Link>
  <Link href="/search-code" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
    Coding Tool
  </Link>
  <Link href="/symptom-checker" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
    Symptoms
  </Link>
  <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
    Insights
  </Link>
  <Link href="/insurance" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
    Insurance
  </Link>
</nav>


        {/* Right: Controls */}
        <div className="flex items-center justify-end gap-2 col-start-3 col-end-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Globe className="h-4 w-4 mr-2" />
            EN
          </Button>
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:inline-flex">Logout</Button>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm" className="hidden md:inline-flex">Login</Button>
            </Link>
          )}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
