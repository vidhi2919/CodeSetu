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
import Link from "next/link"

export default function SearchCodePage() {
  const [code, setCode] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mappingMode, setMappingMode] = useState<"namaste-biomed" | "tm2-biomed" | "namaste-tm2">("namaste-biomed")

  const handleSearch = async () => {
    if (!code.trim()) return
    setIsLoading(true)
    try {
      const modeMap = {
        "namaste-biomed": "namaste_to_biomedicine",
        "tm2-biomed": "tm2_to_biomedicine",
        "namaste-tm2": "namaste_to_tm2"
      }

      const res = await fetch(
        `http://localhost:8000/translate_fhir_by_code?code=${encodeURIComponent(code)}&mode=${modeMap[mappingMode]}`
      )
      if (!res.ok) throw new Error(`Error ${res.status}`)

      const data = await res.json()
      setResults(data.results || [])
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setCode("")
    setResults([])
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          {/* Page Heading */}
          <div className="max-w-5xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
              <Code className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Code Translation</h1>
            <p className="text-muted-foreground mt-1 text-base">Bidirectional NAMASTE ↔ ICD-11 code mapping</p>
          </div>

          {/* Search Card with Results */}
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
                    <Label htmlFor="mappingMode" className="text-sm">Mapping Mode</Label>
                    <select
                      id="mappingMode"
                      value={mappingMode}
                      onChange={(e) => setMappingMode(e.target.value as any)}
                      className="border rounded-md p-2 mb-2"
                    >
                      <option value="namaste-biomed">NAMASTE → Biomedicine</option>
                      <option value="tm2-biomed">TM2 → Biomedicine</option>
                      <option value="namaste-tm2">NAMASTE → TM2</option>
                    </select>

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

                {/* Render Results Inside Card */}
                {results.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {results.map((item, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-background/70">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{item.disease || item.NAMASTE_code || item.TM2_code}</h4>
                          {item.insuranceEligible && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Insurance Eligible
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description || item.icd11_display || "-"}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {item.NAMASTE_code && (
                            <div className="p-2 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                              <h5 className="font-semibold text-cyan-800 dark:text-cyan-200">NAMASTE Code</h5>
                              <p className="font-mono">{item.NAMASTE_code}</p>
                            </div>
                          )}
                          {item.icd11_code && (
                            <div className="p-2 bg-amber-50 dark:bg-amber-950 rounded-lg">
                              <h5 className="font-semibold text-amber-800 dark:text-amber-200">ICD-11 Code</h5>
                              <p className="font-mono">{item.icd11_code}</p>
                            </div>
                          )}
                        </div>

                        {item.symptoms && item.symptoms.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.symptoms.map((s: string, i: number) => (
                              <Badge key={i} variant="outline">{s}</Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            View in Search by Disease
                          </Button>
                          <Link href="/encounter">
                            <Button variant="outline" size="sm">
                              Add to Encounter Form
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Instruction Steps */}
              <div className="px-6 pb-6">
                <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
                  <div className="rounded-md border p-3 bg-background/60">1) Enter NAMASTE/ICD-11</div>
                  <div className="rounded-md border p-3 bg-background/60">2) View mapped details</div>
                  <div className="rounded-md border p-3 bg-background/60">3) Add to Encounter</div>
                </div>
              </div>
            </Card>
          </div>

          {/* How to Use Box */}
          <div className="mt-6 max-w-5xl mx-auto">
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
