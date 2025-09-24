"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Clock, Trash2, Mic } from "lucide-react"
import { ChatbotWidget } from "@/components/chatbot-widget"

// Define type for search history
interface SearchHistoryItem {
  id: string
  query: string
  disease: string
  namasteCode: string
  icd11Code: string
  timestamp: Date
  insuranceEligible: boolean
}

export default function SearchDiseasePage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])

  const handleVoiceInput = () => {}

  const handleSearch = async () => {
    if (!query.trim()) return

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
        relatedDiseases: ["Prameha (Type 2)", "Madhumeha (alternate name)"],
        symptoms: ["Excessive urination", "Increased thirst", "Fatigue", "Blurred vision"],
      }
      setResults(mockResult)

      // Add to search history
      const newSearchItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query: query,
        disease: mockResult.disease,
        namasteCode: mockResult.namasteCode,
        icd11Code: mockResult.icd11Code,
        timestamp: new Date(),
        insuranceEligible: mockResult.insuranceEligible,
      }

      setSearchHistory((prev) => [newSearchItem, ...prev.slice(0, 9)]) // Keep last 10 searches
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setQuery("")
    setResults(null)
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString()
  }

  // Initial centered state
  if (!results) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="p-6">
            {/* Page Heading */}
            <div className="max-w-5xl mx-auto text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Search by Disease</h1>
              <p className="text-muted-foreground mt-1 text-base">
                Search AYUSH diagnoses and find corresponding ICD-11 codes
              </p>
            </div>

            <div className="flex items-start justify-center">
              <Card className="w-full max-w-5xl bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Search className="w-5 h-5" />
                    Disease Translator
                  </CardTitle>
                  <CardDescription className="text-base">
                    Enter a disease/diagnosis name to find mapped NAMASTE ↔ ICD-11 codes and metadata
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
                    <div className="flex flex-col">
                      <Label htmlFor="disease" className="text-sm">
                        Disease / Diagnosis
                      </Label>
                      <Input
                        id="disease"
                        placeholder="e.g., Prameha or Jwara"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        className="border border-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" aria-label="Voice search" onClick={handleVoiceInput}>
                          <Mic className="w-4 h-4" />
                        </Button>
                        <Button onClick={handleSearch} disabled={isLoading}>
                          <Search className="w-4 h-4 mr-2" />
                          {isLoading ? "Searching..." : "Search"}
                        </Button>
                        <Button variant="outline" onClick={handleClear}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Example chips */}
                  <div className="mt-4 text-xs text-gray-500">
                    Try:
                    <button
                      className="ml-1 px-2 py-0.5 rounded-full border hover:bg-muted"
                      onClick={() => {
                        setQuery("Prameha")
                        handleSearch()
                      }}
                    >
                      Prameha
                    </button>
                    <button
                      className="ml-2 px-2 py-0.5 rounded-full border hover:bg-muted"
                      onClick={() => {
                        setQuery("Jwara")
                        handleSearch()
                      }}
                    >
                      Jwara
                    </button>
                  </div>

                  {/* Info box */}
                  <div className="mt-4 rounded-lg border bg-blue-50/70 text-blue-900 p-4">
                    <div className="font-semibold mb-1">Example Diagnoses</div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-semibold">Prameha:</span> Diabetes-related conditions (NAMASTE)
                      </div>
                      <div>
                        <span className="font-semibold">Jwara:</span> Febrile illnesses / Fever
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className="px-6 pb-6">
                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
                    <div className="rounded-md border p-3 bg-background/60">1) Enter disease/diagnosis</div>
                    <div className="rounded-md border p-3 bg-background/60">2) View NAMASTE ↔ ICD-11 mapping</div>
                    <div className="rounded-md border p-3 bg-background/60">3) Add to Encounter</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* How to Use box */}
            <div className="max-w-5xl mx-auto mt-8">
              <Card className="bg-card/70 border-border/60 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle>How to Use Search by Disease</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 py-6 min-h-[220px]">
                  <div className="grid md:grid-cols-2 gap-8 text-base">
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Type diagnosis names in English or regional languages</li>
                        <li>Review matched NAMASTE and ICD-11 codes</li>
                        <li>Copy or save codes to your workflow</li>
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

            {/* Search History Table */}
            {searchHistory.length > 0 && (
              <div className="max-w-5xl mx-auto mt-8">
                <Card className="bg-card/70 border-border/60 rounded-2xl">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recent Searches
                      </CardTitle>
                      <Button variant="outline" size="sm" onClick={clearSearchHistory}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear History
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 rounded-t-lg border-b text-sm font-semibold">
                      <div className="col-span-2">Time</div>
                      <div className="col-span-2">Search Query</div>
                      <div className="col-span-3">Disease</div>
                      <div className="col-span-2">NAMASTE Code</div>
                      <div className="col-span-2">ICD-11 Code</div>
                      <div className="col-span-1">Insurance</div>
                    </div>

                    {/* Table Body */}
                    <div className="max-h-64 overflow-y-auto">
                      {searchHistory.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 gap-4 px-4 py-3 border-b hover:bg-muted/30 cursor-pointer transition-colors"
                          onClick={() => {
                            setQuery(item.query)
                            handleSearch()
                          }}
                        >
                          <div className="col-span-2">
                            <div className="text-xs">
                              <div>{formatDate(item.timestamp)}</div>
                              <div className="text-muted-foreground">{formatTime(item.timestamp)}</div>
                            </div>
                          </div>
                          <div className="col-span-2 font-medium text-sm">{item.query}</div>
                          <div className="col-span-3 text-sm truncate" title={item.disease}>
                            {item.disease}
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {item.namasteCode}
                            </Badge>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {item.icd11Code}
                            </Badge>
                          </div>
                          <div className="col-span-1">
                            <Badge
                              variant={item.insuranceEligible ? "default" : "secondary"}
                              className={`text-xs ${item.insuranceEligible ? "bg-green-100 text-green-800" : ""}`}
                            >
                              {item.insuranceEligible ? "Eligible" : "Not Eligible"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground mt-2 text-center">
                      Click on any row to search again
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Search by Disease</h1>
            <p className="text-muted-foreground">Search AYUSH diagnoses and find corresponding ICD-11 codes</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Disease Translator
              </CardTitle>
              <CardDescription>
                Enter a disease/diagnosis name to find mapped NAMASTE ↔ ICD-11 codes and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="disease">Disease / Diagnosis</Label>
                  <Input
                    id="disease"
                    placeholder="e.g., Prameha or Jwara"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="border border-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="icon" aria-label="Voice search" onClick={handleVoiceInput}>
                    <Mic className="w-4 h-4" />
                  </Button>
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
                    View in Search by Code
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
                <CardTitle>How to Use Search by Disease</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 py-6 min-h-[220px]">
                <div className="grid md:grid-cols-2 gap-8 text-base">
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Type diagnosis names in English or regional languages</li>
                      <li>Review matched NAMASTE and ICD-11 codes</li>
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

          {/* Search History Table */}
          {searchHistory.length > 0 && (
            <div className="mt-6 max-w-5xl mx-auto">
              <Card className="bg-background rounded-2xl">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Searches
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={clearSearchHistory}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear History
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 rounded-t-lg border-b text-sm font-semibold">
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Search Query</div>
                    <div className="col-span-3">Disease</div>
                    <div className="col-span-2">NAMASTE Code</div>
                    <div className="col-span-2">ICD-11 Code</div>
                    <div className="col-span-1">Insurance</div>
                  </div>

                  {/* Table Body */}
                  <div className="max-h-64 overflow-y-auto">
                    {searchHistory.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-4 px-4 py-3 border-b hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => {
                          setQuery(item.query)
                          handleSearch()
                        }}
                      >
                        <div className="col-span-2">
                          <div className="text-xs">
                            <div>{formatDate(item.timestamp)}</div>
                            <div className="text-muted-foreground">{formatTime(item.timestamp)}</div>
                          </div>
                        </div>
                        <div className="col-span-2 font-medium text-sm">{item.query}</div>
                        <div className="col-span-3 text-sm truncate" title={item.disease}>
                          {item.disease}
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.namasteCode}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.icd11Code}
                          </Badge>
                        </div>
                        <div className="col-span-1">
                          <Badge
                            variant={item.insuranceEligible ? "default" : "secondary"}
                            className={`text-xs ${item.insuranceEligible ? "bg-green-100 text-green-800" : ""}`}
                          >
                            {item.insuranceEligible ? "Eligible" : "Not Eligible"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground mt-2 text-center">Click on any row to search again</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
