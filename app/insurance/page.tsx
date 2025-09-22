import { Sidebar } from "@/components/sidebar"
import { InsurancePreCheck } from "@/components/insurance-precheck"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function InsurancePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <InsurancePreCheck />
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
