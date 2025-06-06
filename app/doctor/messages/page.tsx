"use client"

import { Suspense } from "react"
import MessagesPage, { Conversation } from "@/components/messages/messages-page"
import DoctorLayout from "@/components/layout/doctor-layout"

// Sample conversations data for doctor
const initialConversations: Conversation[] = [
  {
    id: "conv-001",
    participantId: "pat-001",
    participantName: "Emma Thompson",
    participantImage: "/placeholder.svg?height=100&width=100",
    participantRole: "Patient",
    lastMessage: {
      content: "Thank you doctor, I'll continue with the prescribed treatment.",
      timestamp: "2025-03-26T07:35:00Z",
      senderId: "pat-001",
      status: "read"
    },
    unreadCount: 0,
    isOnline: true,
    lastActive: "2025-03-26T07:35:00Z"
  },
  {
    id: "conv-002",
    participantId: "pat-002",
    participantName: "James Wilson",
    participantImage: "/placeholder.svg?height=100&width=100",
    participantRole: "Patient",
    lastMessage: {
      content: "The rash has improved significantly since starting the new medication.",
      timestamp: "2025-03-25T16:20:00Z",
      senderId: "pat-002",
      status: "read"
    },
    unreadCount: 1,
    isOnline: false,
    lastActive: "2025-03-25T16:20:00Z"
  }
]

export default function DoctorMessages() {
  return (
    <DoctorLayout>
      <div className="min-h-screen">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center text-gray-500">Loading messages...</div>
          </div>
        }>
          <MessagesPage initialConversations={initialConversations} />
        </Suspense>
      </div>
    </DoctorLayout>
  )
}
