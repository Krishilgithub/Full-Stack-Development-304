"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { AuthForm } from "@/components/auth-form"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatWindow } from "@/components/chat-window"

export default function Home() {
  const { user, loading } = useAuth()
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [otherUser, setOtherUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleChatSelect = (chatId: string, other: any) => {
    setActiveChatId(chatId)
    setOtherUser(other)
    setSidebarOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative z-50 md:z-0 h-full transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <ChatSidebar onChatSelect={handleChatSelect} onToggle={toggleSidebar} />
      </div>

      {/* Main chat area */}
      <ChatWindow chatId={activeChatId} otherUser={otherUser} onToggleSidebar={toggleSidebar} />
    </div>
  )
}
