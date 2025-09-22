"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Mic } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AYUSH coding assistant. Ask me about ICD codes, diseases, or insurance eligibility.",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Mock bot response
    setTimeout(() => {
      let botResponse = ""
      const query = inputText.toLowerCase()

      if (query.includes("prameha") || query.includes("diabetes")) {
        botResponse =
          "Prameha (Diabetes Mellitus) has NAMASTE code NAM-E10.9 and ICD-11 code 5A14.0. It's insurance eligible and commonly treated in AYUSH systems."
      } else if (query.includes("insurance")) {
        botResponse =
          "Most AYUSH conditions with valid ICD-11 mappings are insurance eligible. Would you like me to check a specific condition?"
      } else if (query.includes("icd") || query.includes("code")) {
        botResponse =
          "I can help you find ICD-11 codes for AYUSH conditions. Try asking about specific diseases like 'What is the ICD code for Prameha?'"
      } else {
        botResponse =
          "I can help you with AYUSH-ICD11 code mappings, disease information, and insurance eligibility. What would you like to know?"
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceInput = () => {
    // Mock voice input
    setInputText("What is the ICD code for Prameha?")
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AYUSH Assistant</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  message.isBot ? "bg-muted text-foreground" : "bg-cyan-600 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-2 rounded-lg text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about codes, diseases..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button size="icon" variant="outline" onClick={handleVoiceInput}>
              <Mic className="w-4 h-4" />
            </Button>
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
