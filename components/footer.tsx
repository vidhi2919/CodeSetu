import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <div>
                <h3 className="font-bold">AYUSH-ICD11</h3>
                <p className="text-xs text-muted-foreground">Interoperability Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Bridging traditional Indian medicine with global healthcare standards through intelligent code mapping.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Code Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Translation API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FHIR Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Integration Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Code Examples
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AYUSH-ICD11 Interoperability Platform. Built for Smart India Hackathon 2024.</p>
        </div>
      </div>
    </footer>
  )
}
