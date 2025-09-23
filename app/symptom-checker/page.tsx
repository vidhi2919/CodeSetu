// "use client"

// import { useState } from "react"
// import { Sidebar } from "@/components/sidebar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Stethoscope, Mic, Plus } from "lucide-react"
// import { ChatbotWidget } from "@/components/chatbot-widget"

// export default function SymptomCheckerPage() {
//   const [symptoms, setSymptoms] = useState("")
//   const [results, setResults] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isListening, setIsListening] = useState(false)
//   const handleClear = () => {
//     setSymptoms("")
//     setResults([])
//     setIsListening(false)
//   }

//   const handleVoiceInput = () => {
//     setIsListening(true)
//     // Mock voice input
//     setTimeout(() => {
//       setSymptoms("Patient complains of excessive thirst, frequent urination, fatigue, and blurred vision")
//       setIsListening(false)
//     }, 2000)
//   }

//   const handleAnalyze = async () => {
//     if (!symptoms.trim()) return

//     setIsLoading(true)

//     // Mock analysis results
//     setTimeout(() => {
//       const mockResults = [
//         {
//           disease: "Prameha (Diabetes Mellitus)",
//           description: "Metabolic disorder with high blood sugar levels",
//           namasteCode: "NAM-E10.9",
//           icd11Code: "5A14.0",
//           confidence: 92,
//           matchingSymptoms: ["Excessive thirst", "Frequent urination", "Fatigue"],
//         },
//         {
//           disease: "Mutraghata (Urinary Retention)",
//           description: "Difficulty in urination with associated complications",
//           namasteCode: "NAM-N39.0",
//           icd11Code: "GC90.0",
//           confidence: 68,
//           matchingSymptoms: ["Frequent urination"],
//         },
//         {
//           disease: "Netra Roga (Eye Disorders)",
//           description: "Various eye-related disorders affecting vision",
//           namasteCode: "NAM-H54.9",
//           icd11Code: "9D90.Z",
//           confidence: 45,
//           matchingSymptoms: ["Blurred vision"],
//         },
//       ]
//       setResults(mockResults)
//       setIsLoading(false)
//     }, 1500)
//   }

//   // Initial centered state
//   if (results.length === 0) {
//     return (
//       <div className="flex min-h-screen bg-background">
//         <Sidebar />
//         <main className="flex-1 ml-64">
//           <div className="p-6">
//             <div className="flex items-center justify-center min-h-[60vh]">
//               <Card className="w-full max-w-3xl bg-gradient-to-br from-muted/40 to-background">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Stethoscope className="w-5 h-5" />
//                     Symptom Analysis
//                   </CardTitle>
//                   <CardDescription>Describe the patient's symptoms in detail</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="symptoms">Patient Symptoms</Label>
//                       <Textarea
//                         id="symptoms"
//                         placeholder="Describe the patient's symptoms, complaints, and observations..."
//                         value={symptoms}
//                         onChange={(e) => setSymptoms(e.target.value)}
//                         rows={4}
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <Button onClick={handleAnalyze} disabled={isLoading}>
//                         <Stethoscope className="w-4 h-4 mr-2" />
//                         {isLoading ? "Analyzing..." : "Analyze Symptoms"}
//                       </Button>
//                       <Button variant="outline" onClick={handleVoiceInput} disabled={isListening}>
//                         <Mic className="w-4 h-4 mr-2" />
//                         {isListening ? "Listening..." : "Voice Input"}
//                       </Button>
//                       <Button variant="outline" onClick={handleClear}>Clear</Button>
//                     </div>
//                     {/* Example chips */}
//                     <div className="pt-2">
//                       <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Try:</div>
//                       <div className="flex flex-wrap gap-2">
//                         {["Excessive thirst, frequent urination", "Headache, nausea", "Back pain, stiffness"].map((s) => (
//                           <button
//                             key={s}
//                             onClick={() => setSymptoms(s)}
//                             className="px-3 py-1 rounded-full border text-sm hover:bg-muted"
//                           >
//                             {s}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <div className="px-6 pb-6">
//                   <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
//                     <div className="rounded-md border p-3 bg-background/50">1) Describe symptoms</div>
//                     <div className="rounded-md border p-3 bg-background/50">2) Review likely matches</div>
//                     <div className="rounded-md border p-3 bg-background/50">3) Add to Encounter</div>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </main>
//         <ChatbotWidget />
//       </div>
//     )
//   }

//   // Post-search layout
//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar />
//       <main className="flex-1 ml-64">
//         <div className="p-6">
//           <div className="mb-6 text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
//               <Stethoscope className="w-6 h-6" />
//             </div>
//             <h1 className="text-3xl font-bold text-foreground mb-2">Symptom Checker</h1>
//             <p className="text-muted-foreground">Analyze patient symptoms to identify possible matching diseases</p>
//           </div>

//           <div className="max-w-5xl mx-auto">
//             <Card className="mb-6 bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Stethoscope className="w-5 h-5" />
//                   Symptom Analysis
//                 </CardTitle>
//                 <CardDescription>Describe the patient's symptoms in detail</CardDescription>
//               </CardHeader>
//               <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="symptoms">Patient Symptoms</Label>
//                   <Textarea
//                     id="symptoms"
//                     placeholder="Describe the patient's symptoms, complaints, and observations..."
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                     rows={4}
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Button onClick={handleAnalyze} disabled={isLoading}>
//                     <Stethoscope className="w-4 h-4 mr-2" />
//                     {isLoading ? "Analyzing..." : "Analyze Symptoms"}
//                   </Button>
//                   <Button variant="outline" onClick={handleVoiceInput} disabled={isListening}>
//                     <Mic className="w-4 h-4 mr-2" />
//                     {isListening ? "Listening..." : "Voice Input"}
//                   </Button>
//                 </div>
//               </div>
//               </CardContent>
//             </Card>
//           </div>

//           {results.length > 0 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Possible Matches</h2>
//               {results.map((result, index) => (
//                 <Card key={index}>
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       {result.disease}
//                       <Badge
//                         variant={result.confidence > 80 ? "default" : result.confidence > 60 ? "secondary" : "outline"}
//                       >
//                         {result.confidence}% match
//                       </Badge>
//                     </CardTitle>
//                     <CardDescription>{result.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="p-3 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
//                         <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 text-sm mb-1">NAMASTE Code</h4>
//                         <p className="font-mono">{result.namasteCode}</p>
//                       </div>
//                       <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
//                         <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm mb-1">ICD-11 Code</h4>
//                         <p className="font-mono">{result.icd11Code}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="font-semibold text-sm mb-2">Matching Symptoms</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {result.matchingSymptoms.map((symptom: string, idx: number) => (
//                           <Badge key={idx} variant="outline" className="text-xs">
//                             {symptom}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     <Button variant="outline" size="sm">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add to Encounter Form
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}

//           {/* How to Use box */}
//           <div className="mt-4 max-w-5xl mx-auto">
//             <div className="rounded-2xl border bg-card/70 p-6">
//               <h3 className="text-lg font-semibold mb-4">How to Use Symptom Checker</h3>
//               <div className="grid md:grid-cols-2 gap-8 text-base text-muted-foreground">
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Describe patient symptoms in free text</li>
//                   <li>Run analysis to view likely conditions</li>
//                   <li>Check NAMASTE and ICD-11 codes per result</li>
//                 </ul>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Use voice input for hands-free entry</li>
//                   <li>Add selected results to the encounter form</li>
//                   <li>Refine text to improve match confidence</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <ChatbotWidget />
//     </div>
//   )
// }

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

  const handleClear = () => {
    setSymptoms("")
    setResults([])
    setIsListening(false)
  }

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

  // Initial centered state - matching search-code page layout exactly
  if (results.length === 0) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="p-6">
            {/* Page Heading (moved out of the box) - exact match to search-code */}
            <div className="max-w-5xl mx-auto text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Symptom Checker</h1>
              <p className="text-muted-foreground mt-1 text-base">
                Analyze patient symptoms to identify possible matching diseases
              </p>
            </div>

            <div className="flex items-start justify-center">
              <Card className="w-full max-w-5xl bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Stethoscope className="w-5 h-5" />
                    Symptom Analysis
                  </CardTitle>
                  <CardDescription className="text-base">Describe the patient's symptoms in detail</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
                    <div className="flex flex-col">
                      <Label htmlFor="symptoms" className="text-sm">
                        Patient Symptoms
                      </Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe the patient's symptoms, complaints, and observations..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <div className="flex gap-2">
                        <Button onClick={handleAnalyze} disabled={isLoading}>
                          <Stethoscope className="w-4 h-4 mr-2" />
                          {isLoading ? "Analyzing..." : "Analyze"}
                        </Button>
                        <Button variant="outline" onClick={handleVoiceInput} disabled={isListening}>
                          <Mic className="w-4 h-4 mr-2" />
                          {isListening ? "Listening..." : "Voice"}
                        </Button>
                        <Button variant="outline" onClick={handleClear}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Example chips - matching search-code format */}
                  <div className="mt-4 text-xs text-gray-500">
                    Try:
                    <button
                      className="ml-1 px-2 py-0.5 rounded-full border hover:bg-muted"
                      onClick={() => {
                        setSymptoms("Excessive thirst, frequent urination")
                        handleAnalyze()
                      }}
                    >
                      Excessive thirst, frequent urination
                    </button>
                    <button
                      className="ml-2 px-2 py-0.5 rounded-full border hover:bg-muted"
                      onClick={() => {
                        setSymptoms("Headache, nausea")
                        handleAnalyze()
                      }}
                    >
                      Headache, nausea
                    </button>
                  </div>
                  {/* Info box - matching search-code format */}
                  <div className="mt-4 rounded-lg border bg-blue-50/70 text-blue-900 p-4">
                    <div className="font-semibold mb-1">Symptom Input Examples</div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-semibold">Free text:</span> Patient complains of excessive thirst and
                        fatigue
                      </div>
                      <div>
                        <span className="font-semibold">Voice input:</span> Use microphone for hands-free symptom entry
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
                    <div className="rounded-md border p-3 bg-background/60">1) Describe symptoms</div>
                    <div className="rounded-md border p-3 bg-background/60">2) Review likely matches</div>
                    <div className="rounded-md border p-3 bg-background/60">3) Add to Encounter</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* How to Use box - exact match to search-code */}
            <div className="max-w-5xl mx-auto mt-8">
              <Card className="bg-card/70 border-border/60 rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle>How to Use Symptom Checker</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 py-6 min-h-[220px]">
                  <div className="grid md:grid-cols-2 gap-8 text-base">
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Describe patient symptoms in free text format</li>
                        <li>Use voice input for hands-free symptom entry</li>
                        <li>Review confidence scores and matching symptoms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">For Clinical Analysis</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Compare multiple possible diagnoses with confidence levels</li>
                        <li>Access both NAMASTE and ICD-11 codes for documentation</li>
                        <li>Add selected results directly to encounter forms</li>
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

  // Post-search layout - matching search-code page structure
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6 text-center">
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="symptoms">Patient Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe the patient's symptoms, complaints, and observations..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAnalyze} disabled={isLoading}>
                    <Stethoscope className="w-4 h-4 mr-2" />
                    {isLoading ? "Analyzing..." : "Analyze"}
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
                      <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                        <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">NAMASTE Code</h4>
                        <p className="text-lg font-mono">{result.namasteCode}</p>
                      </div>
                      <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">ICD-11 Code</h4>
                        <p className="text-lg font-mono">{result.icd11Code}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Matching Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchingSymptoms.map((symptom: string, idx: number) => (
                          <Badge key={idx} variant="outline">
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

          {/* How to Use box - exact match to search-code */}
          <div className="mt-6 max-w-5xl mx-auto">
            <Card className="bg-background rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle>How to Use Symptom Checker</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 py-6 min-h-[220px]">
                <div className="grid md:grid-cols-2 gap-8 text-base">
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Describe patient symptoms in free text format</li>
                      <li>Use voice input for hands-free symptom entry</li>
                      <li>Review confidence scores and matching symptoms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Clinical Analysis</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Compare multiple possible diagnoses with confidence levels</li>
                      <li>Access both NAMASTE and ICD-11 codes for documentation</li>
                      <li>Add selected results directly to encounter forms</li>
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
