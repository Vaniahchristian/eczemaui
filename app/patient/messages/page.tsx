"use client"

import MessagesPage, { Conversation } from "@/components/messages/messages-page"

// Sample conversations data for patient
const initialConversations: Conversation[] = [
  {
    id: "conv-001",
    participantId: "doc-001",
    participantName: "Dr. Emily Chen",
    participantImage: "/placeholder.svg?height=100&width=100",
    participantRole: "Dermatologist",
    lastMessage: {
      content: "Your latest test results look good. Keep up with the treatment plan!",
      timestamp: "2025-03-26T07:30:00Z",
      senderId: "doc-001",
      status: "read"
    },
    unreadCount: 0,
    isOnline: true,
    lastActive: "2025-03-26T07:30:00Z"
  },
  {
    id: "conv-002",
    participantId: "doc-002",
    participantName: "Dr. Michael Johnson",
    participantImage: "/placeholder.svg?height=100&width=100",
    participantRole: "General Practitioner",
    lastMessage: {
      content: "Don't forget your follow-up appointment next week!",
      timestamp: "2025-03-25T15:45:00Z",
      senderId: "pat-001",
      status: "delivered"
    },
    unreadCount: 2,
    isOnline: false,
    lastActive: "2025-03-25T16:00:00Z"
  }
]

export default function PatientMessages() {
  return <MessagesPage initialConversations={initialConversations} />
}
