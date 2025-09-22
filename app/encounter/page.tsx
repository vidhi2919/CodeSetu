import { Sidebar } from "@/components/sidebar"
import { EncounterForm } from "@/components/encounter-form"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function EncounterPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <EncounterForm />
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
