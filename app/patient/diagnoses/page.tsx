"use client"

import { useState, useEffect, Suspense } from "react"
import DiagnosesPage, { Diagnosis } from "@/components/diagnoses/diagnoses-page"
import PatientLayout from "@/components/layout/patient-layout"

export default function PatientDiagnoses() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    // Simulate fetching diagnoses data
    setDiagnoses([
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
        treatment: "Applied cold compress and prescribed antihistamine cream.",
        followUp: "2025-03-05",
        doctor: "Dr. James Wilson",
        progress: 90
      }
    ])
  }, [])

  return (
    <PatientLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-gray-500">Loading diagnoses...</div>
        </div>
      }>
        <DiagnosesPage initialDiagnoses={diagnoses} />
      </Suspense>
    </PatientLayout>
  )
}
