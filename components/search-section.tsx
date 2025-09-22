"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowRight, Copy, CheckCircle, AlertCircle } from "lucide-react"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCode, setSelectedCode] = useState<any>(null)

  const mockSearchResults = [
    {
      id: "AYU-5012",
      namasteCode: "AYU-5012",
      namasteName: "Nidranasha (Insomnia)",
      icd11Code: "7A00",
      icd11Name: "Insomnia disorder",
      category: "Sleep Disorders",
      confidence: 95,
      insuranceEligible: true,
    },
    {
      id: "AYU-3045",
      namasteCode: "AYU-3045",
      namasteName: "Prameha (Diabetes)",
      icd11Code: "5A11",
      icd11Name: "Type 2 diabetes mellitus",
      category: "Endocrine Disorders",
      confidence: 98,
      insuranceEligible: true,
    },
    {
      id: "AYU-2156",
      namasteCode: "AYU-2156",
      namasteName: "Hridroga (Heart Disease)",
      icd11Code: "BA00",
      icd11Name: "Ischaemic heart diseases",
      category: "Cardiovascular",
      confidence: 92,
      insuranceEligible: true,
    },
  ]

  return (
    <section id="search" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Code Search & Translation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search across NAMASTE and ICD-11 codes with intelligent mapping and real-time translation
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="search">Code Search</TabsTrigger>
            <TabsTrigger value="translate">Code Translation</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Medical Codes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Search by condition, code, or symptoms (e.g., 'insomnia', 'AYU-5012', 'अनिद्रा')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockSearchResults.map((result) => (
                    <Card
                      key={result.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedCode(result)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{result.namasteCode}</Badge>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <Badge variant="secondary">{result.icd11Code}</Badge>
                              {result.insuranceEligible && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                            <h4 className="font-semibold mb-1">{result.namasteName}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{result.icd11Name}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Category: {result.category}</span>
                              <span>Confidence: {result.confidence}%</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translate" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>NAMASTE Code Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Enter NAMASTE code (e.g., AYU-5012)" className="mb-4" />
                  <Button className="w-full">
                    Translate to ICD-11
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ICD-11 Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>7A00</Badge>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Insomnia disorder</h4>
                      <p className="text-sm text-muted-foreground">
                        Sleep-wake disorders characterized by difficulty initiating or maintaining sleep
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span>Insurance Pre-check: Eligible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
