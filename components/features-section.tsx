import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Globe, Shield, Zap, Database, Smartphone, FileText, Mic, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Assisted Mapping",
    description: "Smart suggestions for unmapped NAMASTE codes using advanced NLP algorithms",
    badge: "AI Powered",
  },
  {
    icon: Globe,
    title: "Multilingual Search",
    description: "Query in Hindi, Sanskrit, Tamil, Malayalam and other regional languages",
    badge: "Multi-language",
  },
  {
    icon: Shield,
    title: "Insurance Integration",
    description: "Real-time claim eligibility checks with pre-approval status indicators",
    badge: "Insurance Ready",
  },
  {
    icon: Zap,
    title: "Real-time API",
    description: "Lightning-fast REST APIs with sub-100ms response times",
    badge: "High Performance",
  },
  {
    icon: Database,
    title: "FHIR Compliance",
    description: "Fully compliant with FHIR R4 standards and India EHR guidelines",
    badge: "Standards Compliant",
  },
  {
    icon: Smartphone,
    title: "Offline Mode",
    description: "SQLite local cache with automatic sync when connectivity returns",
    badge: "Offline Ready",
  },
  {
    icon: FileText,
    title: "Clinical Decision Support",
    description: "Treatment suggestions based on selected codes and patient context",
    badge: "CDS Enabled",
  },
  {
    icon: Mic,
    title: "Voice Search",
    description: "Dictate conditions and symptoms for hands-free code lookup",
    badge: "Voice Enabled",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting on usage patterns and mapping coverage",
    badge: "Analytics",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and capabilities designed for modern healthcare interoperability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join healthcare institutions across India in modernizing medical coding and improving patient care
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="text-sm py-2 px-4">
                  ✅ Free API Access
                </Badge>
                <Badge variant="outline" className="text-sm py-2 px-4">
                  ✅ 24/7 Support
                </Badge>
                <Badge variant="outline" className="text-sm py-2 px-4">
                  ✅ HIPAA Compliant
                </Badge>
                <Badge variant="outline" className="text-sm py-2 px-4">
                  ✅ Enterprise Ready
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
