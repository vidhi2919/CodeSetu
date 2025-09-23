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

import { Sidebar } from "@/components/sidebar"
import { Shield } from "lucide-react"
import { InsurancePreCheck } from "@/components/insurance-precheck"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InsurancePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          {/* Page Heading - exact match to search-code page */}
          <div className="max-w-5xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Insurance Pre-Check</h1>
            <p className="text-muted-foreground mt-1 text-base">
              Verify insurance eligibility and coverage for AYUSH treatments
            </p>
          </div>

          {/* Main content - wrapped in same container as Search by Code */}
          <div className="flex items-start justify-center">
            <div className="w-full max-w-5xl">
              <InsurancePreCheck />
            </div>
          </div>

          {/* How to Use box - exact match to search-code */}
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
