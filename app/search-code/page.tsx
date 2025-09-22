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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Search by Code</h1>
            <p className="text-muted-foreground">Enter a NAMASTE or ICD-11 code to find detailed disease information</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Search
              </CardTitle>
              <CardDescription>
                Enter either a NAMASTE code (e.g., NAM-E10.9) or ICD-11 code (e.g., 5A14.0)
              </CardDescription>
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
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
