"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Globe, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
        <div className="relative flex w-full items-center">
          <div className="flex items-center gap-4">
            {/* Replace text with logo image */}
            <Image src="/logo.png" alt="Naमः Logo" width={100} height={40} className="rounded-lg" />
            <Badge variant="secondary" className="hidden sm:inline-flex">
              v2.1.0
            </Badge>
          </div>
          <nav className="hidden md:flex items-center gap-10 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Diseases
            </Link>
            <Link
              href="/search-code"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Coding Tool
            </Link>
            <Link
              href="/symptom-checker"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Symptoms
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Insights
            </Link>
            <Link
              href="/insurance"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Insurance
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Globe className="h-4 w-4 mr-2" />
              EN
            </Button>
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex bg-transparent"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm" className="hidden md:inline-flex">
                  Login
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
