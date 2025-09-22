"use client"

import { useState } from "react"
import { Search, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function InsurancePreCheck() {
  const [searchQuery, setSearchQuery] = useState("")
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([])

  const handleCheck = () => {
    // Mock insurance eligibility results
    const mockResults = [
      {
        id: 1,
        diagnosis: "Nidranasha (Insomnia)",
        namasteCode: "AYUSH.NS.001",
        icd11Code: "7A00.0",
        status: "eligible",
        coverage: 85,
        insurers: ["IRDAI-001", "IRDAI-045", "IRDAI-078"],
        notes: "Covered under mental health benefits",
      },
      {
        id: 2,
        diagnosis: "Panchakosha Imbalance",
        namasteCode: "AYUSH.PK.012",
        icd11Code: "QE10.Y",
        status: "pending",
        coverage: 60,
        insurers: ["IRDAI-001"],
        notes: "Requires pre-authorization for AYUSH treatments",
      },
      {
        id: 3,
        diagnosis: "Rasayana Therapy",
        namasteCode: "AYUSH.RT.005",
        icd11Code: null,
        status: "not_eligible",
        coverage: 0,
        insurers: [],
        notes: "No ICD-11 mapping available, not covered",
      },
    ]
    setEligibilityResults(mockResults)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "not_eligible":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return <Badge className="bg-green-100 text-green-800">✅ Eligible</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">⚠ Pending</Badge>
      case "not_eligible":
        return <Badge className="bg-red-100 text-red-800">❌ Not Eligible</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Pre-Check</h1>
        <p className="text-gray-600">Check insurance eligibility for AYUSH diagnoses</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Enter diagnosis or code to check eligibility..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && handleCheck()}
              />
            </div>
            <Button onClick={handleCheck}>Check Eligibility</Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {eligibilityResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Eligibility Results</h2>
          {eligibilityResults.map((result) => (
            <Card key={result.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    {getStatusIcon(result.status)}
                    <span>{result.diagnosis}</span>
                  </CardTitle>
                  {getStatusBadge(result.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Codes */}
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-amber-100 text-amber-800">NAMASTE</Badge>
                      <span className="font-mono text-sm">{result.namasteCode}</span>
                    </div>
                    {result.icd11Code && (
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">ICD-11</Badge>
                        <span className="font-mono text-sm">{result.icd11Code}</span>
                      </div>
                    )}
                  </div>

                  {/* Coverage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Coverage Percentage</span>
                      <span className="text-sm font-bold">{result.coverage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.coverage >= 80
                            ? "bg-green-500"
                            : result.coverage >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${result.coverage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Insurers */}
                  {result.insurers.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Covered by:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.insurers.map((insurer: string) => (
                          <Badge key={insurer} variant="outline">
                            {insurer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{result.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {eligibilityResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Eligibility Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {eligibilityResults.filter((r) => r.status === "eligible").length}
                </div>
                <div className="text-sm text-gray-600">Eligible</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-yellow-600">
                  {eligibilityResults.filter((r) => r.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-600">
                  {eligibilityResults.filter((r) => r.status === "not_eligible").length}
                </div>
                <div className="text-sm text-gray-600">Not Eligible</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
