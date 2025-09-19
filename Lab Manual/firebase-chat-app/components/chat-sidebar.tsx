"use client"

import { useState, useEffect } from "react"
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { db } from "@/lib/firebase"

interface ChatSidebarProps {
  onChatSelect: (chatId: string, otherUser: any) => void
  onToggle?: () => void
}

export function ChatSidebar({ onChatSelect, onToggle }: ChatSidebarProps) {
  const { user, logout } = useAuth()
  const [recentChats, setRecentChats] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    if (!user) return

    const userChatsRef = collection(db, "userChats", user.uid, "items")
    const q = query(userChatsRef, orderBy("updatedAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => doc.data())
      setRecentChats(chats)
    })

    return unsubscribe
  }, [user])

  const searchUsers = async (term: string) => {
    if (!term.trim() || !user) {
      setSearchResults([])
      return
    }

    const usersRef = collection(db, "users")
    const snapshot = await getDocs(usersRef)
    const users = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (u) =>
          u.uid !== user.uid &&
          (u.name?.toLowerCase().includes(term.toLowerCase()) || u.email?.toLowerCase().includes(term.toLowerCase())),
      )
      .slice(0, 10)

    setSearchResults(users)
  }

  const startChatWith = async (otherUser: any) => {
    if (!user) return

    const chatId = user.uid < otherUser.uid ? `${user.uid}_${otherUser.uid}` : `${otherUser.uid}_${user.uid}`

    const chatRef = doc(db, "chats", chatId)
    const chatSnap = await getDoc(chatRef)

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        chatId,
        participants: [user.uid, otherUser.uid],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: "",
      })
    }

    // Update user chats
    await setDoc(
      doc(db, "userChats", user.uid, "items", chatId),
      {
        chatId,
        otherUid: otherUser.uid,
        otherName: otherUser.name || "User",
        otherPhoto: otherUser.photoURL || "",
        lastMessage: "",
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )

    await setDoc(
      doc(db, "userChats", otherUser.uid, "items", chatId),
      {
        chatId,
        otherUid: user.uid,
        otherName: user.displayName || "User",
        otherPhoto: user.photoURL || "",
        lastMessage: "",
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )

    onChatSelect(chatId, otherUser)
    setSearchTerm("")
    setSearchResults([])
  }

  const formatTime = (date: any) => {
    if (!date) return ""
    const d = date.toDate ? date.toDate() : new Date(date)
    const diff = Math.floor((Date.now() - d.getTime()) / 1000)
    if (diff < 60) return `${diff}s`
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
  }

  return (
    <div className="w-80 bg-slate-900/50 backdrop-blur-md border-r border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
          <h1 className="text-xl font-bold text-white">Chatter</h1>
        </div>

        {/* User info */}
        <Card className="bg-white/5 border-white/10 p-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.photoURL || ""} />
              <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">{user?.displayName || "Anonymous"}</div>
              <div className="text-white/60 text-sm truncate">{user?.email}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="flex gap-2">
          <Input
            placeholder="Search users by name/email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              searchUsers(e.target.value)
            }}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50"
          />
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            +
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-white/10">
        <Card className="bg-white/5 border-white/10 p-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white cursor-pointer">
              <span>💬</span>
              <span>Chats</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 cursor-pointer">
              <span>👥</span>
              <span>People</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 cursor-pointer">
              <span>🙍</span>
              <span>Profile</span>
            </div>
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 cursor-pointer"
              onClick={logout}
            >
              <span>🚪</span>
              <span>Logout</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="p-4 border-b border-white/10">
          <div className="text-white/60 text-sm mb-2">Search Results</div>
          <div className="space-y-2">
            {searchResults.map((user) => (
              <div
                key={user.uid}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                onClick={() => startChatWith(user)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.photoURL || `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{user.name || "User"}</div>
                  <div className="text-white/60 text-xs truncate">{user.email}</div>
                </div>
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  Chat
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Chats */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="text-white/60 text-sm mb-2">Recent chats</div>
          <div className="space-y-2">
            {recentChats.map((chat) => (
              <div
                key={chat.chatId}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer"
                onClick={() =>
                  onChatSelect(chat.chatId, {
                    uid: chat.otherUid,
                    name: chat.otherName,
                    photoURL: chat.otherPhoto,
                  })
                }
              >
                <Avatar>
                  <AvatarImage
                    src={chat.otherPhoto || `https://api.dicebear.com/9.x/thumbs/svg?seed=${chat.otherUid}`}
                  />
                  <AvatarFallback>{chat.otherName?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{chat.otherName || "User"}</div>
                  <div className="text-white/60 text-sm truncate">{chat.lastMessage || "Say hi 👋"}</div>
                </div>
                <div className="text-white/40 text-xs">{formatTime(chat.updatedAt)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 text-center text-white/40 text-sm border-t border-white/10">Built with Firebase</div>
    </div>
  )
}
