"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { db } from "@/lib/firebase"

interface ChatWindowProps {
  chatId: string | null
  otherUser: any
  onToggleSidebar?: () => void
}

export function ChatWindow({ chatId, otherUser, onToggleSidebar }: ChatWindowProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chatId) {
      setMessages([])
      return
    }

    const messagesRef = collection(db, "chats", chatId, "messages")
    const q = query(messagesRef, orderBy("createdAt", "asc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMessages(msgs)
    })

    return unsubscribe
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId || !user) return

    setLoading(true)
    try {
      const messagesRef = collection(db, "chats", chatId, "messages")
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        senderId: user.uid,
        createdAt: serverTimestamp(),
      })

      // Update chat metadata
      const chatRef = doc(db, "chats", chatId)
      await updateDoc(chatRef, {
        lastMessage: newMessage.trim(),
        updatedAt: serverTimestamp(),
      })

      // Update user chats
      const [uid1, uid2] = chatId.split("_")
      const otherUid = user.uid === uid1 ? uid2 : uid1

      await updateDoc(doc(db, "userChats", user.uid, "items", chatId), {
        lastMessage: newMessage.trim(),
        updatedAt: serverTimestamp(),
      })

      await updateDoc(doc(db, "userChats", otherUid, "items", chatId), {
        lastMessage: newMessage.trim(),
        updatedAt: serverTimestamp(),
      })

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/70">
            No chat selected
          </div>
          <p className="text-white/50 mt-4">Select a conversation or find people to start chatting.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden text-white hover:bg-white/10"
          >
            ☰
          </Button>
          <Avatar>
            <AvatarImage
              src={otherUser?.photoURL || `https://api.dicebear.com/9.x/thumbs/svg?seed=${otherUser?.uid}`}
            />
            <AvatarFallback>{otherUser?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-semibold">{otherUser?.name || "Chat"}</div>
            <div className="text-white/60 text-sm">{otherUser?.email || ""}</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => {
          const isMe = message.senderId === user?.uid
          return (
            <div key={message.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isMe ? "bg-blue-600 text-white" : "bg-white/10 text-white border border-white/20"
                }`}
              >
                {message.text}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            className="flex-1 min-h-[50px] max-h-32 bg-black/20 border-white/20 text-white placeholder:text-white/50 resize-none"
            rows={1}
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 self-end"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
