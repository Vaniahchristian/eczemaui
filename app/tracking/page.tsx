"use client"

import dynamic from "next/dynamic"
import type { Metadata } from "next"

const HealthTrackingPage = dynamic(
  () => import("@/components/tracking/health-tracking-page"),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Health Tracking | EczemaAI",
  description: "Track and monitor your health metrics to better manage your eczema condition",
}

export default function TrackingPage() {
  return <HealthTrackingPage />
}
