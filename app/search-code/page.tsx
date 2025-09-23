"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Code, ArrowRight } from "lucide-react"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function SearchCodePage() {
  const [code, setCode] = useState("")
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!code.trim()) return

    setIsLoading(true)

    // Mock search results
    setTimeout(() => {
      const mockResult = {
        disease: "Prameha (Diabetes Mellitus)",
        description:
          "A metabolic disorder characterized by high blood sugar levels due to insulin deficiency or resistance. In AYUSH, Prameha is classified as a disorder of metabolism affecting multiple body systems.",
        namasteCode: "NAM-E10.9",
        icd11Code: "5A14.0",
        category: "Endocrine, nutritional or metabolic diseases",
        insuranceEligible: true,
        relatedCodes: ["NAM-E11.9", "NAM-E13.9"],
        symptoms: ["Excessive urination", "Increased thirst", "Fatigue", "Blurred vision"],
      }
      setResults(mockResult)
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setCode("")
    setResults(null)
  }

  // Initial centered state
  if (!results) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="p-6">
            {/* Page Heading (moved out of the box) */}
            <div className="max-w-5xl mx-auto text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <Code className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Code Translation</h1>
              <p className="text-muted-foreground mt-1 text-base">Bidirectional NAMASTE ↔ ICD-11 code mapping</p>
            </div>

            <div className="flex items-start justify-center">
              <Card className="w-full max-w-5xl bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Code className="w-5 h-5" />
                    Code Translator
                  </CardTitle>
                  <CardDescription className="text-base">Enter a medical code to find its equivalent mapping and metadata</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
                    <div className="flex flex-col">
                      <Label htmlFor="code" className="text-sm">Medical Code</Label>
                      <Input
                        id="code"
                        placeholder="NAM-E10.9 or 5A14.0"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <div className="flex gap-2">
                        <Button onClick={handleSearch} disabled={isLoading}>
                          <Search className="w-4 h-4 mr-2" />
                          {isLoading ? "Searching..." : "Translate"}
                        </Button>
                        <Button variant="outline" onClick={handleClear}>Clear</Button>
                      </div>
                    </div>
                  </div>
                  {/* Example chips */}
                  <div className="mt-4 text-xs text-gray-500">
                    Try: 
                    <button className="ml-1 px-2 py-0.5 rounded-full border hover:bg-muted" onClick={() => { setCode("NAM-E10.9"); handleSearch(); }}>NAM-E10.9</button>
                    <button className="ml-2 px-2 py-0.5 rounded-full border hover:bg-muted" onClick={() => { setCode("5A14.0"); handleSearch(); }}>5A14.0</button>
                  </div>
                  {/* Info box */}
                  <div className="mt-4 rounded-lg border bg-blue-50/70 text-blue-900 p-4">
                    <div className="font-semibold mb-1">Code Format Examples</div>
                    <div className="text-sm space-y-1">
                      <div><span className="font-semibold">NAMASTE:</span> NAM001, NAM002, etc.</div>
                      <div><span className="font-semibold">ICD-11:</span> 8A00, 8A01, MG30, etc.</div>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
                    <div className="rounded-md border p-3 bg-background/60">1) Enter NAMASTE/ICD-11</div>
                    <div className="rounded-md border p-3 bg-background/60">2) View mapped details</div>
                    <div className="rounded-md border p-3 bg-background/60">3) Add to Encounter</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* How to Use box */}
            <div className="max-w-5xl mx-auto mt-8">
              <Card className="bg-card/70 border-border/60 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle>How to Use Code Translation</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 py-6 min-h-[220px]">
                  <div className="grid md:grid-cols-2 gap-8 text-base">
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Enter traditional NAMASTE codes to find ICD-11 equivalents</li>
                        <li>Use for international reporting and insurance claims</li>
                        <li>Copy codes directly to your medical records system</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">For Insurance Officers</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Verify ICD-11 codes against traditional medicine practices</li>
                        <li>Check insurance eligibility status for conditions</li>
                        <li>Access multi-language condition names for verification</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <ChatbotWidget />
      </div>
    )
  }

  // Post-search layout
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Code Translation</h1>
            <p className="text-muted-foreground">Bidirectional NAMASTE ↔ ICD-11 code mapping</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Translator
              </CardTitle>
              <CardDescription>Enter a medical code to find its equivalent mapping and metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="code">Medical Code</Label>
                  <Input
                    id="code"
                    placeholder="NAM-E10.9 or 5A14.0"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} disabled={isLoading}>
                    <Search className="w-4 h-4 mr-2" />
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {results.disease}
                  {results.insuranceEligible && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Insurance Eligible
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{results.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{results.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                    <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">NAMASTE Code</h4>
                    <p className="text-lg font-mono">{results.namasteCode}</p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">ICD-11 Code</h4>
                    <p className="text-lg font-mono">{results.icd11Code}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Common Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.symptoms.map((symptom: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View in Search by Disease
                  </Button>
                  <Button variant="outline" size="sm">
                    Add to Encounter Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* How to Use box */}
          <div className="mt-6 max-w-5xl mx-auto">
            <Card className="bg-background rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle>How to Use Code Translation</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 py-6 min-h-[220px]">
                <div className="grid md:grid-cols-2 gap-8 text-base">
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Enter traditional NAMASTE codes to find ICD-11 equivalents</li>
                      <li>Use for international reporting and insurance claims</li>
                      <li>Copy codes directly to your medical records system</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Insurance Officers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Verify ICD-11 codes against traditional medicine practices</li>
                      <li>Check insurance eligibility status for conditions</li>
                      <li>Access multi-language condition names for verification</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
