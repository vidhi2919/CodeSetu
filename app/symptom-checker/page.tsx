"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Mic, Plus } from "lucide-react"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleVoiceInput = () => {
    setIsListening(true)
    // Mock voice input
    setTimeout(() => {
      setSymptoms("Patient complains of excessive thirst, frequent urination, fatigue, and blurred vision")
      setIsListening(false)
    }, 2000)
  }

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return

    setIsLoading(true)

    // Mock analysis results
    setTimeout(() => {
      const mockResults = [
        {
          disease: "Prameha (Diabetes Mellitus)",
          description: "Metabolic disorder with high blood sugar levels",
          namasteCode: "NAM-E10.9",
          icd11Code: "5A14.0",
          confidence: 92,
          matchingSymptoms: ["Excessive thirst", "Frequent urination", "Fatigue"],
        },
        {
          disease: "Mutraghata (Urinary Retention)",
          description: "Difficulty in urination with associated complications",
          namasteCode: "NAM-N39.0",
          icd11Code: "GC90.0",
          confidence: 68,
          matchingSymptoms: ["Frequent urination"],
        },
        {
          disease: "Netra Roga (Eye Disorders)",
          description: "Various eye-related disorders affecting vision",
          namasteCode: "NAM-H54.9",
          icd11Code: "9D90.Z",
          confidence: 45,
          matchingSymptoms: ["Blurred vision"],
        },
      ]
      setResults(mockResults)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Symptom Checker</h1>
            <p className="text-muted-foreground">Analyze patient symptoms to identify possible matching diseases</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Symptom Analysis
              </CardTitle>
              <CardDescription>Describe the patient's symptoms in detail</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="symptoms">Patient Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe the patient's symptoms, complaints, and observations..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAnalyze} disabled={isLoading}>
                    <Stethoscope className="w-4 h-4 mr-2" />
                    {isLoading ? "Analyzing..." : "Analyze Symptoms"}
                  </Button>
                  <Button variant="outline" onClick={handleVoiceInput} disabled={isListening}>
                    <Mic className="w-4 h-4 mr-2" />
                    {isListening ? "Listening..." : "Voice Input"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Possible Matches</h2>
              {results.map((result, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {result.disease}
                      <Badge
                        variant={result.confidence > 80 ? "default" : result.confidence > 60 ? "secondary" : "outline"}
                      >
                        {result.confidence}% match
                      </Badge>
                    </CardTitle>
                    <CardDescription>{result.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                        <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 text-sm mb-1">NAMASTE Code</h4>
                        <p className="font-mono">{result.namasteCode}</p>
                      </div>
                      <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm mb-1">ICD-11 Code</h4>
                        <p className="font-mono">{result.icd11Code}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Matching Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchingSymptoms.map((symptom: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Encounter Form
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
