"use client"

import { useState } from "react"
import { Search, Mic, MicOff, Copy, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SearchTranslate() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Mock voice recognition
    if (!isListening) {
      setTimeout(() => {
        setSearchQuery("nidranasha")
        setIsListening(false)
        handleSearch("nidranasha")
      }, 2000)
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsListening(false)
  }

  const handleSearch = (query: string) => {
    // Mock search results
    const mockResults = [
      {
        id: 1,
        namasteCode: "AYUSH.NS.001",
        namasteName: "Nidranasha (निद्रानाश)",
        icd11Code: "7A00.0",
        icd11Name: "Insomnia disorder",
        confidence: 95,
        description: "Sleep disorder characterized by difficulty falling asleep or staying asleep",
      },
      {
        id: 2,
        namasteCode: "AYUSH.NS.002",
        namasteName: "Anidra (अनिद्रा)",
        icd11Code: "7A00.1",
        icd11Name: "Sleep-wake disorder",
        confidence: 88,
        description: "Disruption of normal sleep patterns",
      },
    ]
    setSearchResults(mockResults)
  }

  const handleSaveMapping = (result: any) => {
    console.log("Saving mapping:", result)
    // Mock save to FHIR
  }

  // Initial centered state (before any results)
  if (searchResults.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-5xl bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Search & Translate Diagnoses</CardTitle>
            <div className="text-base text-gray-500 mt-1">Type in Hindi, Sanskrit, Tamil, or English</div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search diagnoses (English, Hindi, Sanskrit, Tamil)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                />
              </div>
              <Button variant={isListening ? "destructive" : "outline"} onClick={handleVoiceSearch} className="px-4">
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isListening ? "Stop" : "Voice"}
              </Button>
              <div className="flex gap-2">
                <Button onClick={() => handleSearch(searchQuery)}>Translate</Button>
                <Button variant="outline" onClick={handleClear}>Clear</Button>
              </div>
            </div>
            {isListening && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 text-sm">Listening... Speak your diagnosis</span>
                </div>
              </div>
            )}
            {/* Example chips */}
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Try:</div>
              <div className="flex flex-wrap gap-2">
                {["Nidranasha", "Amlapitta", "Kasa", "Jwara"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setSearchQuery(q.toLowerCase())
                      handleSearch(q.toLowerCase())
                    }}
                    className="px-3 py-1 rounded-full border text-sm hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            {/* Info box */}
            <div className="mt-4 rounded-lg border bg-blue-50/70 text-blue-900 p-4">
              <div className="font-semibold mb-1">Code Format Examples</div>
              <div className="text-sm space-y-1">
                <div><span className="font-semibold">NAMASTE:</span> NAM001, NAM002, etc.</div>
                <div><span className="font-semibold">ICD-11:</span> 8A00, 8A01, MG30, etc.</div>
              </div>
            </div>
            {/* Keyboard hint */}
            <div className="mt-4 text-xs text-gray-500 text-center">Press Enter to search</div>
          </CardContent>
          {/* How it works */}
          <div className="px-6 pb-6">
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
              <div className="rounded-md border p-3 bg-background/60">1) Type or use Voice</div>
              <div className="rounded-md border p-3 bg-background/60">2) Review dual-code matches</div>
              <div className="rounded-md border p-3 bg-background/60">3) Copy ICD-11 or Save to FHIR</div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Post-search layout (original)
  return (
    <div className="space-y-6">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
          <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search diagnoses (English, Hindi, Sanskrit, Tamil)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              />
            </div>
            <Button variant={isListening ? "destructive" : "outline"} onClick={handleVoiceSearch} className="px-4">
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? "Stop" : "Voice"}
            </Button>
            <Button onClick={() => handleSearch(searchQuery)}>Search</Button>
          </div>
          {isListening && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-700 text-sm">Listening... Speak your diagnosis</span>
              </div>
            </div>
          )}
          </CardContent>
          {/* How it works (keep consistent with Code Translation) */}
          <div className="px-6 pb-6">
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
              <div className="rounded-md border p-3 bg-background/60">1) Type or use Voice</div>
              <div className="rounded-md border p-3 bg-background/60">2) Review dual-code matches</div>
              <div className="rounded-md border p-3 bg-background/60">3) Copy ICD-11 or Save to FHIR</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900">Search Results</h2>
        {searchResults.map((result) => (
          <Card key={result.id} className="border-l-4 border-l-cyan-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Dual Coding Match</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {result.confidence}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-amber-100 text-amber-800">NAMASTE</Badge>
                    <span className="font-mono text-sm text-gray-600">{result.namasteCode}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{result.namasteName}</h3>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">ICD-11</Badge>
                    <span className="font-mono text-sm text-gray-600">{result.icd11Code}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{result.icd11Name}</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Code
                    </Button>
                    <Button size="sm" onClick={() => handleSaveMapping(result)}>
                      <Save className="w-3 h-3 mr-1" />
                      Save to FHIR
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
