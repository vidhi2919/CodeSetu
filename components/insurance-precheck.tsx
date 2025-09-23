// "use client"

// import { useState } from "react"
// import { Search, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// export function InsurancePreCheck() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [eligibilityResults, setEligibilityResults] = useState<any[]>([])
//   const handleClear = () => {
//     setSearchQuery("")
//     setEligibilityResults([])
//   }

//   const handleCheck = () => {
//     // Mock insurance eligibility results
//     const mockResults = [
//       {
//         id: 1,
//         diagnosis: "Nidranasha (Insomnia)",
//         namasteCode: "AYUSH.NS.001",
//         icd11Code: "7A00.0",
//         status: "eligible",
//         coverage: 85,
//         insurers: ["IRDAI-001", "IRDAI-045", "IRDAI-078"],
//         notes: "Covered under mental health benefits",
//       },
//       {
//         id: 2,
//         diagnosis: "Panchakosha Imbalance",
//         namasteCode: "AYUSH.PK.012",
//         icd11Code: "QE10.Y",
//         status: "pending",
//         coverage: 60,
//         insurers: ["IRDAI-001"],
//         notes: "Requires pre-authorization for AYUSH treatments",
//       },
//       {
//         id: 3,
//         diagnosis: "Rasayana Therapy",
//         namasteCode: "AYUSH.RT.005",
//         icd11Code: null,
//         status: "not_eligible",
//         coverage: 0,
//         insurers: [],
//         notes: "No ICD-11 mapping available, not covered",
//       },
//     ]
//     setEligibilityResults(mockResults)
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "eligible":
//         return <CheckCircle className="w-5 h-5 text-green-500" />
//       case "pending":
//         return <AlertTriangle className="w-5 h-5 text-yellow-500" />
//       case "not_eligible":
//         return <XCircle className="w-5 h-5 text-red-500" />
//       default:
//         return null
//     }
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "eligible":
//         return <Badge className="bg-green-100 text-green-800">✅ Eligible</Badge>
//       case "pending":
//         return <Badge className="bg-yellow-100 text-yellow-800">⚠ Pending</Badge>
//       case "not_eligible":
//         return <Badge className="bg-red-100 text-red-800">❌ Not Eligible</Badge>
//       default:
//         return null
//     }
//   }

//   // Initial centered state
//   if (eligibilityResults.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[70vh]">
//         <Card className="w-full max-w-3xl bg-gradient-to-br from-muted/40 to-background">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Insurance Pre-Check</CardTitle>
//             <div className="text-sm text-gray-500 mt-1">Verify eligibility across insurers before submitting claims</div>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="flex space-x-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Enter diagnosis or code to check eligibility..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                   onKeyPress={(e) => e.key === "Enter" && handleCheck()}
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <Button onClick={handleCheck}>Check Eligibility</Button>
//                 <Button variant="outline" onClick={handleClear}>Clear</Button>
//               </div>
//             </div>
//             {/* Example chips */}
//             <div className="mt-4 text-xs text-gray-500">
//               Try: 
//               <button className="ml-1 px-2 py-0.5 rounded-full border hover:bg-muted" onClick={() => { setSearchQuery("Nidranasha"); handleCheck(); }}>Nidranasha</button>
//               <button className="ml-2 px-2 py-0.5 rounded-full border hover:bg-muted" onClick={() => { setSearchQuery("Rasayana Therapy"); handleCheck(); }}>Rasayana Therapy</button>
//             </div>
//             {/* Info box */}
//             <div className="mt-4 rounded-lg border bg-blue-50 text-blue-800 p-4">
//               <div className="font-semibold mb-1">Code Format Examples</div>
//               <div className="text-sm space-y-1">
//                 <div><span className="font-semibold">NAMASTE:</span> NAM001, NAM002, etc.</div>
//                 <div><span className="font-semibold">ICD-11:</span> 8A00, 8A01, MG30, etc.</div>
//               </div>
//             </div>
//           </CardContent>
//           <div className="px-6 pb-6">
//             <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
//               <div className="rounded-md border p-3 bg-background/50">1) Enter diagnosis/code</div>
//               <div className="rounded-md border p-3 bg-background/50">2) Check eligibility & coverage</div>
//               <div className="rounded-md border p-3 bg-background/50">3) Proceed with pre-auth</div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     )
//   }

//   // Post-search layout
//   return (
//     <div className="space-y-6">
//       <div className="max-w-5xl mx-auto">
//         <Card className="bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
//           <CardContent className="p-6">
//           <div className="flex space-x-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 placeholder="Enter diagnosis or code to check eligibility..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//                 onKeyPress={(e) => e.key === "Enter" && handleCheck()}
//               />
//             </div>
//               <div className="flex gap-2">
//                 <Button onClick={handleCheck}>Check Eligibility</Button>
//                 <Button variant="outline" onClick={handleClear}>Clear</Button>
//               </div>
//             </div>
//           </CardContent>
//           {/* How it works tiles */}
//           <div className="px-6 pb-6">
//             <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
//               <div className="rounded-md border p-3 bg-background/60">1) Enter diagnosis/code</div>
//               <div className="rounded-md border p-3 bg-background/60">2) Check eligibility & coverage</div>
//               <div className="rounded-md border p-3 bg-background/60">3) Proceed with pre-auth</div>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Results */}
//       {eligibilityResults.length > 0 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-gray-900">Eligibility Results</h2>
//           {eligibilityResults.map((result) => (
//             <Card key={result.id} className="border-l-4 border-l-blue-500">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-lg flex items-center space-x-2">
//                     {getStatusIcon(result.status)}
//                     <span>{result.diagnosis}</span>
//                   </CardTitle>
//                   {getStatusBadge(result.status)}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {/* Codes */}
//                   <div className="flex space-x-4">
//                     <div className="flex items-center space-x-2">
//                       <Badge className="bg-amber-100 text-amber-800">NAMASTE</Badge>
//                       <span className="font-mono text-sm">{result.namasteCode}</span>
//                     </div>
//                     {result.icd11Code && (
//                       <div className="flex items-center space-x-2">
//                         <Badge className="bg-blue-100 text-blue-800">ICD-11</Badge>
//                         <span className="font-mono text-sm">{result.icd11Code}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Coverage */}
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium">Coverage Percentage</span>
//                       <span className="text-sm font-bold">{result.coverage}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full ${
//                           result.coverage >= 80
//                             ? "bg-green-500"
//                             : result.coverage >= 50
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                         }`}
//                         style={{ width: `${result.coverage}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Insurers */}
//                   {result.insurers.length > 0 && (
//                     <div>
//                       <span className="text-sm font-medium">Covered by:</span>
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {result.insurers.map((insurer: string) => (
//                           <Badge key={insurer} variant="outline">
//                             {insurer}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Notes */}
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">{result.notes}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Summary Stats */}
//       {eligibilityResults.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Eligibility Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-4 text-center">
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-green-600">
//                   {eligibilityResults.filter((r) => r.status === "eligible").length}
//                 </div>
//                 <div className="text-sm text-gray-600">Eligible</div>
//               </div>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-yellow-600">
//                   {eligibilityResults.filter((r) => r.status === "pending").length}
//                 </div>
//                 <div className="text-sm text-gray-600">Pending</div>
//               </div>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-red-600">
//                   {eligibilityResults.filter((r) => r.status === "not_eligible").length}
//                 </div>
//                 <div className="text-sm text-gray-600">Not Eligible</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Shield, CheckCircle, XCircle, Clock } from "lucide-react"

interface InsuranceResult {
  condition: string
  namasteCode: string
  icd11Code: string
  status: "eligible" | "pending" | "not-covered"
  coverage: number
  insurers: string[]
  notes: string
}

export function InsurancePreCheck() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<InsuranceResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)

    // Mock search results
    setTimeout(() => {
      const mockResults: InsuranceResult[] = [
        {
          condition: "Prameha (Diabetes Mellitus)",
          namasteCode: "NAM-E10.9",
          icd11Code: "5A14.0",
          status: "eligible",
          coverage: 85,
          insurers: ["AYUSH Insurance Co.", "Traditional Health Plans", "Integrated Care"],
          notes: "Covered under AYUSH treatment protocols with pre-authorization required for specialized treatments.",
        },
        {
          condition: "Panchakosha Therapy",
          namasteCode: "NAM-Z51.1",
          icd11Code: "QA02.0",
          status: "pending",
          coverage: 60,
          insurers: ["AYUSH Insurance Co."],
          notes: "Under review for inclusion in standard coverage. Currently requires case-by-case approval.",
        },
        {
          condition: "Experimental Ayurvedic Treatment",
          namasteCode: "NAM-Z99.9",
          icd11Code: "QA99.Z",
          status: "not-covered",
          coverage: 0,
          insurers: [],
          notes: "Not covered under current insurance policies. Patient responsibility for all costs.",
        },
      ]
      setResults(mockResults)
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "not-covered":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eligible":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "not-covered":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Initial centered state - matching search-code page layout
  if (results.length === 0) {
    return (
      <Card className="w-full max-w-5xl bg-gradient-to-br from-muted/40 to-background rounded-2xl shadow-sm border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5" />
            Insurance Pre-Check
          </CardTitle>
          <CardDescription className="text-base">
            Enter a diagnosis or medical code to verify insurance eligibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
            <div className="flex flex-col">
              <Label htmlFor="query" className="text-sm">
                Diagnosis or Code
              </Label>
              <Input
                id="query"
                placeholder="Enter condition name, NAMASTE code, or ICD-11 code"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end justify-end">
              <div className="flex gap-2">
                <Button onClick={handleSearch} disabled={isLoading}>
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? "Checking..." : "Check Coverage"}
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
                setQuery("Diabetes")
                handleSearch()
              }}
            >
              Diabetes
            </button>
            <button
              className="ml-2 px-2 py-0.5 rounded-full border hover:bg-muted"
              onClick={() => {
                setQuery("NAM-E10.9")
                handleSearch()
              }}
            >
              NAM-E10.9
            </button>
          </div>
          {/* Info box */}
          <div className="mt-4 rounded-lg border bg-blue-50/70 text-blue-900 p-4">
            <div className="font-semibold mb-1">Coverage Status Types</div>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-semibold">Eligible:</span> Covered under current insurance policies
              </div>
              <div>
                <span className="font-semibold">Pending:</span> Under review or requires pre-authorization
              </div>
            </div>
          </div>
        </CardContent>
        <div className="px-6 pb-6">
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="rounded-md border p-3 bg-background/60">1) Enter diagnosis/code</div>
            <div className="rounded-md border p-3 bg-background/60">2) Review coverage status</div>
            <div className="rounded-md border p-3 bg-background/60">3) Proceed with treatment</div>
          </div>
        </div>
      </Card>
    )
  }

  // Post-search layout
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Insurance Pre-Check
          </CardTitle>
          <CardDescription>Enter a diagnosis or medical code to verify insurance eligibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="query">Diagnosis or Code</Label>
              <Input
                id="query"
                placeholder="Enter condition name, NAMASTE code, or ICD-11 code"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "Checking..." : "Check"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Coverage Results</h2>
          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {result.condition}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
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
                  <h4 className="font-semibold mb-2">Coverage Percentage</h4>
                  <div className="space-y-2">
                    <Progress value={result.coverage} className="w-full" />
                    <p className="text-sm text-muted-foreground">{result.coverage}% covered</p>
                  </div>
                </div>

                {result.insurers.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Supported Insurers</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.insurers.map((insurer, idx) => (
                        <Badge key={idx} variant="outline">
                          {insurer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{result.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Summary */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Coverage Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.filter((r) => r.status === "eligible").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Eligible</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.filter((r) => r.status === "pending").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {results.filter((r) => r.status === "not-covered").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Not Covered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
