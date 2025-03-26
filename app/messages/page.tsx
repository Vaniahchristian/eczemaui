"use client"

import MessagesPage, { Conversation } from "@/components/messages/messages-page"

// Sample messages data
const initialConversations: Conversation[] = [
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
      content: "Let's schedule a follow-up appointment next week.",
      timestamp: "2025-03-26T10:15:00",
      senderId: "user-001",
      status: "delivered"
    },
    unreadCount: 2,
    isOnline: false
  }
]

export default function Messages() {
  return <MessagesPage initialConversations={initialConversations} />
}
