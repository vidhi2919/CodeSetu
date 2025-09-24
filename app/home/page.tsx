"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Code, Stethoscope, Shield } from "lucide-react"

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ayush_user")
      if (stored) {
        const parsed = JSON.parse(stored)
        setUserName(parsed?.name ?? null)
        setUserEmail(parsed?.email ?? null)
      }
    } catch (_) {
      // ignore
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="px-6 py-8 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 rounded-xl border border-border bg-card/60 backdrop-blur p-6">
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {userName ? `Welcome back, ${userName}` : "Welcome back"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {userEmail ?? "Access your tools and recent insights at a glance"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { title: "Search by Disease", href: "/search", icon: Search, color: "text-blue-600" },
                { title: "Search by Code", href: "/search-code", icon: Code, color: "text-green-600" },
                { title: "Symptom Checker", href: "/symptom-checker", icon: Stethoscope, color: "text-purple-600" },
                { title: "Encounter Form", href: "/encounter", icon: Shield, color: "text-red-600" },
              ].map((action) => (
                <Link key={action.title} href={action.href}>
                  <Card className="hover:shadow-md transition-all border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-card-foreground">
                        <action.icon className={`w-5 h-5 ${action.color}`} />
                        {action.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <AnalyticsDashboard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
