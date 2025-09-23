"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, FileText, BarChart3, Shield, Languages, Home, Code, Stethoscope, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search by Disease", href: "/search", icon: Search },
  { name: "Search by Code", href: "/search-code", icon: Code },
  { name: "Symptom Checker", href: "/symptom-checker", icon: Stethoscope },
  { name: "Encounter Form", href: "/encounter", icon: FileText },
  { name: "Analytics Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Insurance Pre-Check", href: "/insurance", icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    try {
      localStorage.removeItem("ayush_user")
    } catch (_) {}
    router.push("/")
    router.refresh?.()
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center h-16 border-b border-sidebar-border">
  <div className="flex items-center">
    <Image
      src="/logo.png"
      alt="AYUSH Logo"
      width={150}
      height={150}
      className="rounded-lg object-contain"
    />
  </div>
</div>




        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-sidebar-foreground">Theme</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-sidebar-foreground">Language</span>
          </div>
          <Select defaultValue="en">
            <SelectTrigger className="w-full bg-sidebar border-sidebar-border text-sidebar-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
              <SelectItem value="sa">संस्कृत (Sanskrit)</SelectItem>
              <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
          <p className="text-xs text-muted-foreground text-center">NAMASTE ↔ ICD-11 Integration</p>
        </div>
      </div>
    </div>
  )
}
