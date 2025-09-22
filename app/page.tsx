"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"
import { Sidebar } from "@/components/sidebar"
import {
  Search,
  Code,
  Stethoscope,
  BarChart3,
  Shield,
  MessageCircle,
  Heart,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Search,
    title: "Search by Disease",
    description: "Find ICD-11 codes for AYUSH disease names with intelligent matching",
    href: "/search",
    color: "text-blue-600",
  },
  {
    icon: Code,
    title: "Search by Code",
    description: "Enter NAMASTE or ICD-11 codes to find comprehensive disease details",
    href: "/search-code",
    color: "text-green-600",
  },
  {
    icon: Stethoscope,
    title: "Symptom Checker",
    description: "Advanced symptom analysis to identify matching diseases and conditions",
    href: "/symptom-checker",
    color: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive coding statistics, insights, and performance metrics",
    href: "/dashboard",
    color: "text-orange-600",
  },
  {
    icon: Shield,
    title: "Encounter Form",
    description: "Create detailed patient encounters with dual coding capabilities",
    href: "/encounter",
    color: "text-red-600",
  },
  {
    icon: MessageCircle,
    title: "Insurance Pre-Check",
    description: "Verify insurance eligibility and coverage for AYUSH treatments",
    href: "/insurance",
    color: "text-cyan-600",
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Trusted by Healthcare Professionals",
    description: "Used by over 1,000+ AYUSH practitioners nationwide",
  },
  {
    icon: Users,
    title: "Seamless Integration",
    description: "Easy integration with existing healthcare management systems",
  },
  {
    icon: Award,
    title: "Certified & Compliant",
    description: "Fully compliant with national healthcare coding standards",
  },
]

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoggedIn(true)
    setIsLoading(false)
  }

  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to AYUSH Dashboard</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Access all your dual coding tools and analytics in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-border bg-card hover:bg-card/80">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-card-foreground">
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Header */}
        <header className="relative z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AYUSH</h1>
                <p className="text-sm text-muted-foreground">Dual Coding Service</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                    Bridge Traditional
                    <span className="text-primary"> AYUSH </span>
                    with Global Standards
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                    Seamlessly convert AYUSH medicine practices to ICD-11 standards with our intelligent dual coding
                    platform. Trusted by healthcare professionals nationwide.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {["Intelligent disease mapping", "Real-time code validation", "Comprehensive analytics"].map(
                    (benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ),
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border text-foreground hover:bg-muted bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Login Form */}
              <div className="flex justify-center lg:justify-end">
                <LoginForm onLogin={handleLogin} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 px-6 py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Coding Solutions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage AYUSH-ICD11 dual coding efficiently and accurately
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card border-border hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-card-foreground">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose AYUSH Dual Coding?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 border-t border-border bg-muted/20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 AYUSH Dual Coding Service. NAMASTE ↔ ICD-11 Integration Platform
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
