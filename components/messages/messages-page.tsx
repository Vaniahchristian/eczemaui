"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardLayout from "@/components/layout/dashboard-layout"
import ConversationsList from "@/components/messages/conversations-list"
import MessageThread from "@/components/messages/message-thread"
import DoctorProfile from "@/components/messages/doctor-profile"
import EmptyState from "@/components/messages/empty-state"
import { useIsMobile } from "@/hooks/use-mobile"

export type MessageStatus = "sent" | "delivered" | "read"
export type MessageType = "text" | "image" | "file" | "voice" | "ai-suggestion"

export type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  status: MessageStatus
  type: MessageType
  attachments?: {
    url: string
    type: string
    name: string
    size?: number
  }[]
  reaction?: string
  isAiSuggestion?: boolean
}

export type Conversation = {
  id: string
  participantId: string
  participantName: string
  participantImage: string
  participantRole: string
  lastMessage: {
    content: string
    timestamp: string
    senderId: string
    status: MessageStatus
  }
  unreadCount: number
  isOnline: boolean
  lastActive?: string
}

interface MessagesPageProps {
  initialConversations?: Conversation[]
}

export default function MessagesPage({ initialConversations = [] }: MessagesPageProps) {
  const isMobile = useIsMobile()
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState(!isMobile)
  const [searchQuery, setSearchQuery] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations || [])
  const currentUserId = "user-001" // This would come from auth context in a real app

  // Sample messages for each conversation
  const [messages, setMessages] = useState<Record<string, Message[]>>({})

  useEffect(() => {
    // Initialize sample messages for each conversation
    const initialMessages: Record<string, Message[]> = {}
    conversations.forEach((conv) => {
      initialMessages[conv.id] = [
        {
          id: `msg-${conv.id}-1`,
          senderId: conv.participantId,
          receiverId: currentUserId,
          content: conv.lastMessage.content,
          timestamp: conv.lastMessage.timestamp,
          status: "read",
          type: "text"
        }
      ]
    })
    setMessages(initialMessages)
  }, [conversations, currentUserId])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id)
    if (isMobile) {
      setShowProfile(false)
    }
  }

  const activeConversationData = conversations.find((conv) => conv.id === activeConversation)
  const activeMessages = activeConversation ? (messages[activeConversation] || []) : []

  // Set first conversation as active by default if none is selected
  useEffect(() => {
    if (!activeConversation && conversations.length > 0) {
      setActiveConversation(conversations[0].id)
    }
  }, [activeConversation, conversations])

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participantRole.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle mobile view - show either conversations list or message thread
  const handleConversationSelect = (convId: string) => {
    setActiveConversation(convId)
    if (isMobile) {
      setShowProfile(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex overflow-hidden"
        >
          {/* Conversations List - Hidden on mobile when viewing a conversation */}
          <div
            className={`${
              isMobile && activeConversation ? "hidden" : "w-full md:w-80 lg:w-96"
            } border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex flex-col`}
          >
            <ConversationsList
              conversations={filteredConversations}
              activeConversationId={activeConversation}
              onSelectConversation={handleConversationSelect}
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />
          </div>

          {/* Message Thread - Hidden on mobile when viewing conversations list */}
          <div
            className={`${
              isMobile && !activeConversation ? "hidden" : "flex-1"
            } flex flex-col bg-slate-50 dark:bg-slate-800`}
          >
            {activeConversation && activeConversationData ? (
              <MessageThread
                conversation={activeConversationData}
                messages={activeMessages}
                currentUserId={currentUserId}
                onBack={() => isMobile && setActiveConversation(null)}
                onToggleProfile={() => setShowProfile(!showProfile)}
                isMobile={isMobile}
              />
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Doctor Profile - Hidden on mobile or when toggled off */}
          {!isMobile && showProfile && activeConversation && activeConversationData && (
            <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 hidden lg:block">
              <DoctorProfile
                participant={{
                  id: activeConversationData.participantId,
                  name: activeConversationData.participantName,
                  image: activeConversationData.participantImage,
                  role: activeConversationData.participantRole,
                  isOnline: activeConversationData.isOnline,
                  lastActive: activeConversationData.lastActive,
                }}
                onClose={() => setShowProfile(false)}
              />
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
