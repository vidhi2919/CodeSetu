// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Sidebar } from "@/components/sidebar"
// import { Header } from "@/components/header"
// import { HeroSection } from "@/components/hero-section"
// import { FeaturesSection } from "@/components/features-section"
// import { Footer } from "@/components/footer"
// import { AnalyticsDashboard } from "@/components/analytics-dashboard"
// import {
//   Search,
//   Code,
//   Stethoscope,
//   BarChart3,
//   Shield,
//   MessageCircle,
//   Heart,
//   Users,
//   Award,
//   ArrowRight,
//   CheckCircle,
// } from "lucide-react"
// import Link from "next/link"

// const features = [
//   {
//     icon: Search,
//     title: "Diseases",
//     description: "Find ICD-11 codes for AYUSH disease names with intelligent matching",
//     href: "/search",
//     color: "text-blue-600",
//   },
//   {
//     icon: Code,
//     title: "ICD Codes",
//     description: "Enter NAMASTE or ICD-11 codes to find comprehensive disease details",
//     href: "/search-code",
//     color: "text-green-600",
//   },
//   {
//     icon: Stethoscope,
//     title: "Symptoms",
//     description: "Advanced symptom analysis to identify matching diseases and conditions",
//     href: "/symptom-checker",
//     color: "text-purple-600",
//   },
//   {
//     icon: BarChart3,
//     title: "Insights",
//     description: "Comprehensive coding statistics, insights, and performance metrics",
//     href: "/dashboard",
//     color: "text-orange-600",
//   },
//   {
//     icon: Shield,
//     title: "Encounter Form",
//     description: "Create detailed patient encounters with dual coding capabilities",
//     href: "/encounter",
//     color: "text-red-600",
//   },
//   {
//     icon: MessageCircle,
//     title: "Insurance Pre-Check",
//     description: "Verify insurance eligibility and coverage for AYUSH treatments",
//     href: "/insurance",
//     color: "text-cyan-600",
//   },
// ]

// const benefits = [
//   {
//     icon: Heart,
//     title: "Trusted by Healthcare Professionals",
//     description: "Used by over 1,000+ AYUSH practitioners nationwide",
//   },
//   {
//     icon: Users,
//     title: "Seamless Integration",
//     description: "Easy integration with existing healthcare management systems",
//   },
//   {
//     icon: Award,
//     title: "Certified & Compliant",
//     description: "Fully compliant with national healthcare coding standards",
//   },
// ]

// export default function HomePage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [userName, setUserName] = useState<string | null>(null)
//   const [userEmail, setUserEmail] = useState<string | null>(null)

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("ayush_user")
//       if (stored) {
//         const parsed = JSON.parse(stored)
//         setIsLoggedIn(Boolean(parsed?.loggedIn))
//         setUserName(parsed?.name ?? null)
//         setUserEmail(parsed?.email ?? null)
//       }
//     } catch (_) {
//       // ignore
//     }
//   }, [])

//   if (isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <main>
//           <section className="px-6 py-8 bg-gradient-to-b from-muted/30 to-transparent">
//             <div className="max-w-7xl mx-auto">
//               <div className="mb-8 rounded-xl border border-border bg-card/60 backdrop-blur p-6">
//                 <h1 className="text-3xl font-bold text-foreground mb-1">{userName ? `Welcome back, ${userName}` : "Welcome back"}</h1>
//                 <p className="text-sm text-muted-foreground">{userEmail ?? "Access your tools and recent insights at a glance"}</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//                 {[
//                   { title: "Search by Disease", href: "/search", icon: Search, color: "text-blue-600" },
//                   { title: "Search by Code", href: "/search-code", icon: Code, color: "text-green-600" },
//                   { title: "Symptom Checker", href: "/symptom-checker", icon: Stethoscope, color: "text-purple-600" },
//                   { title: "Encounter Form", href: "/encounter", icon: Shield, color: "text-red-600" },
//                 ].map((action) => (
//                   <Link key={action.title} href={action.href}>
//                     <Card className="hover:shadow-md transition-all border-border bg-card">
//                       <CardHeader>
//                         <CardTitle className="flex items-center gap-3 text-card-foreground">
//                           <action.icon className={`w-5 h-5 ${action.color}`} />
//                           {action.title}
//                         </CardTitle>
//                       </CardHeader>
//                     </Card>
//                   </Link>
//                 ))}
//               </div>

//               <AnalyticsDashboard />
//             </div>
//           </section>
//         </main>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
//       <div className="relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

//         <Header />

//         <HeroSection />

//         <FeaturesSection />

//         {/* Keep benefits minimal for now; focus on hero and features polish */}

//         <Footer />
//       </div>
//     </div>
//   )
// }

"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <Header />
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  )
}
