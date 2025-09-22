import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Globe2, Database } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Digital Health Interoperability
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Bridging AYUSH &<span className="text-primary"> Modern Medicine</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Seamlessly connect traditional Indian medicine (NAMASTE) codes with global ICD-11 standards. Enable dual
            coding, insurance integration, and clinical decision support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Coding
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              View API Docs
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Database className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">4,500+ Codes</h3>
              <p className="text-sm text-muted-foreground">Complete NAMASTE code database with ICD-11 mappings</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">FHIR Compliant</h3>
              <p className="text-sm text-muted-foreground">Fully compliant with FHIR R4 and India EHR standards</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time API</h3>
              <p className="text-sm text-muted-foreground">Lightning-fast code translation and search capabilities</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Globe2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Multilingual</h3>
              <p className="text-sm text-muted-foreground">Support for Hindi, Sanskrit, Tamil, Malayalam and more</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Trusted by Healthcare Institutions</h2>
          <p className="text-muted-foreground mb-6">
            Enabling seamless integration between traditional and modern medical systems
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="text-sm font-medium">AIIMS Delhi</div>
            <div className="text-sm font-medium">NIMHANS</div>
            <div className="text-sm font-medium">JIPMER</div>
            <div className="text-sm font-medium">PGIMER</div>
            <div className="text-sm font-medium">SGPGI</div>
          </div>
        </div>
      </div>
    </section>
  )
}
