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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search & Translate Diagnoses</h1>
        <p className="text-gray-600">Search for AYUSH diagnoses and find corresponding ICD-11 codes</p>
      </div>

      {/* Search Bar */}
      <Card>
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
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
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
                  {/* NAMASTE Code */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-amber-100 text-amber-800">NAMASTE</Badge>
                      <span className="font-mono text-sm text-gray-600">{result.namasteCode}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{result.namasteName}</h3>
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </div>

                  {/* ICD-11 Code */}
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
      )}
    </div>
  )
}
