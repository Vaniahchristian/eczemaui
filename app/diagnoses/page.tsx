"use client"

import DiagnosesPage, { Diagnosis } from "@/components/diagnoses/diagnoses-page"

// Sample diagnoses data
const initialDiagnoses: Diagnosis[] = [
  {
    id: "diag-001",
    date: "2025-03-15",
    condition: "Atopic Dermatitis",
    severity: "Moderate",
    location: "Arms, neck",
    symptoms: ["Redness", "Itching", "Dry skin", "Inflammation"],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    notes: "Patient reports increased itching at night and after showering. Environmental triggers may include pollen and stress.",
    treatment: "Prescribed hydrocortisone cream (1%) to be applied twice daily. Recommended daily moisturizing with fragrance-free lotion.",
    followUp: "2025-04-10",
    doctor: "Dr. Emily Chen",
    progress: 65
  },
  {
    id: "diag-002",
    date: "2025-02-20",
    condition: "Contact Dermatitis",
    severity: "Mild",
    location: "Hands",
    symptoms: ["Redness", "Itching", "Blisters"],
    images: ["/placeholder.svg?height=300&width=400"],
    notes: "Likely caused by new dish soap. Recommended switching to hypoallergenic products.",
    treatment: "Prescribed topical corticosteroid cream to be applied twice daily for 7 days.",
    followUp: "2025-03-05",
    doctor: "Dr. Michael Johnson",
    progress: 90
  },
  {
    id: "diag-003",
    date: "2025-01-18",
    condition: "Atopic Dermatitis",
    severity: "Severe",
    location: "Face, neck, arms",
    symptoms: ["Severe itching", "Redness", "Cracked skin", "Bleeding", "Pain"],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    notes: "Flare-up possibly triggered by recent stress and weather changes. Patient reports difficulty sleeping due to itching.",
    treatment: "Prescribed stronger corticosteroid cream and oral antihistamines. Recommended wet wrap therapy at night.",
    followUp: "2025-02-01",
    doctor: "Dr. Emily Chen",
    progress: 85
  }
]

export default function Diagnoses() {
  return <DiagnosesPage initialDiagnoses={initialDiagnoses} />
}
