"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MessagesRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/patient/messages")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-gray-500">Redirecting to messages...</div>
    </div>
  )
}
