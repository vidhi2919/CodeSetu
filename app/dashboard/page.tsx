import { Sidebar } from "@/components/sidebar"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <AnalyticsDashboard />
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
