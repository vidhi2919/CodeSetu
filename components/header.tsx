import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Menu, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
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

        <nav className="hidden md:flex items-center gap-6">
          <a href="#search" className="text-sm font-medium hover:text-primary transition-colors">
            Code Search
          </a>
          <a href="#translate" className="text-sm font-medium hover:text-primary transition-colors">
            Translation
          </a>
          <a href="#analytics" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </a>
          <a href="#api" className="text-sm font-medium hover:text-primary transition-colors">
            API Docs
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Globe className="h-4 w-4 mr-2" />
            EN
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
