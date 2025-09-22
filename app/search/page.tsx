import { Sidebar } from "@/components/sidebar"
import { SearchTranslate } from "@/components/search-translate"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function SearchPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <SearchTranslate />
        </div>
      </main>
      <ChatbotWidget />
    </div>
  )
}
