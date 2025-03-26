"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample messages data
const conversations = [
  {
    id: "conv-001",
    participantId: "doc-001",
    participantName: "Dr. Emily Chen",
    participantImage: "/placeholder.svg?height=200&width=200",
    participantRole: "Dermatologist",
    lastMessage: {
      content: "Your latest test results look good. The treatment is working well.",
      timestamp: "2025-03-26T14:30:00",
      senderId: "doc-001",
      status: "read"
    },
    unreadCount: 0,
    isOnline: true
  },
  {
    id: "conv-002",
    participantId: "doc-002",
    participantName: "Dr. Michael Johnson",
    participantImage: "/placeholder.svg?height=200&width=200",
    participantRole: "Allergist",
    lastMessage: {
      content: "Please send me photos of any new reactions you notice.",
      timestamp: "2025-03-25T10:15:00",
      senderId: "doc-002",
      status: "read"
    },
    unreadCount: 0,
    isOnline: false,
    lastActive: "2 hours ago"
  }
]

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      {/* Conversations List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? "bg-gray-50" : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.participantImage} />
                    <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold truncate">{conversation.participantName}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
                  <p className="text-xs text-gray-400">{conversation.participantRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread or Empty State */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600">Select a conversation</h3>
          <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    </div>
  )
}
