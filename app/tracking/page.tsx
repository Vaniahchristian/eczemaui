"use client"

import dynamic from "next/dynamic"

const HealthTrackingPage = dynamic(
  () => import("@/components/tracking/health-tracking-page"),
  { ssr: false }
)

export default function TrackingPage() {
  return <HealthTrackingPage />
}
