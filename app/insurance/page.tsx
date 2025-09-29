// import { Sidebar } from "@/components/sidebar"
// import { Shield } from "lucide-react"
// import { InsurancePreCheck } from "@/components/insurance-precheck"
// import { ChatbotWidget } from "@/components/chatbot-widget"

// export default function InsurancePage() {
//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar />
//       <main className="flex-1 ml-64">
//         <div className="p-6">
//           <div className="max-w-5xl mx-auto text-center mb-8">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
//               <Shield className="w-6 h-6" />
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold">Insurance Pre-Check</h1>
//             <p className="text-muted-foreground">Verify insurance eligibility and coverage for AYUSH treatments</p>
//           </div>
//           <div className="max-w-5xl mx-auto">
//             <InsurancePreCheck />
//           </div>

//           {/* How to Use box */}
//           <div className="mt-4 max-w-5xl mx-auto">
//             <div className="rounded-2xl border bg-card/70 p-6">
//               <h3 className="text-lg font-semibold mb-4">How to Use Insurance Pre-Check</h3>
//               <div className="grid md:grid-cols-2 gap-8 text-base text-muted-foreground">
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Enter diagnosis or code to verify eligibility</li>
//                   <li>Review coverage percentage and status</li>
//                   <li>See supported insurers and notes</li>
//                 </ul>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Use the summary to compare eligible vs pending</li>
//                   <li>Proceed with pre-auth for eligible conditions</li>
//                   <li>Update codes in case of mapping changes</li>
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
import { Shield } from "lucide-react"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InsurancePage() {
  const [term, setTerm] = useState("")
  const [status, setStatus] = useState<null | "eligible" | "pending" | "not_eligible">(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!term.trim()) return
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/search_icd_fhir?term=${encodeURIComponent(term)}&language=english`
      )
      const data = await res.json()

      const results = data.results || []
      let eligible = false
      let pending = false

      for (const item of results) {
        const params = item.parameter || []

        const icdParam = params.find((p: any) => p.name === "icd11_biomedicine_code")
        const tm2Param = params.find((p: any) => p.name === "TM2_code")

        if (icdParam && icdParam.valueString && icdParam.valueString !== "-") {
          eligible = true
          break
        }
        if (tm2Param && tm2Param.valueString && tm2Param.valueString !== "-") {
          pending = true
        }
      }

      if (eligible) setStatus("eligible")
      else if (pending) setStatus("pending")
      else setStatus("not_eligible")
    } catch (err) {
      console.error(err)
      setStatus("not_eligible")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          {/* Page Heading */}
          <div className="max-w-5xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Insurance Pre-Check</h1>
            <p className="text-muted-foreground mt-1 text-base">
              Verify insurance eligibility and coverage for AYUSH treatments
            </p>
          </div>

          {/* Main Check Card */}
          <div className="flex items-start justify-center">
            <div className="w-full max-w-5xl">
              <Card className="p-6 border-border/60 rounded-2xl">
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Enter condition (English)"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                    />
                    <Button onClick={handleCheck} disabled={loading}>
                      {loading ? "Checking..." : "Check"}
                    </Button>
                  </div>

                  {status && (
                    <div className="mt-4 text-lg font-semibold">
                      {status === "eligible" && <span className="text-green-600">✅ Eligible</span>}
                      {status === "pending" && <span className="text-yellow-600">⚠️ Pending (TM2 Code)</span>}
                      {status === "not_eligible" && <span className="text-red-600">❌ Not Eligible</span>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Use Card */}
          <div className="max-w-5xl mx-auto mt-8">
            <Card className="bg-card/70 border-border/60 rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle>How to Use Insurance Pre-Check</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 py-6 min-h-[220px]">
                <div className="grid md:grid-cols-2 gap-8 text-base">
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Healthcare Providers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Enter diagnosis or code to verify eligibility</li>
                      <li>Review coverage percentage and status</li>
                      <li>Use for international reporting and insurance claims</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">For Insurance Officers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>See supported insurers and coverage notes</li>
                      <li>Proceed with pre-auth for eligible conditions</li>
                      <li>Update codes in case of mapping changes</li>
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
