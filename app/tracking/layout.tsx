import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Health Tracking | EczemaAI",
  description: "Track and monitor your health metrics to better manage your eczema condition",
}

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
