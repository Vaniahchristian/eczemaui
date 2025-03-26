"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DiagnosesRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/patient/diagnoses")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-gray-500">Redirecting to patient diagnoses...</div>
    </div>
  )
}
