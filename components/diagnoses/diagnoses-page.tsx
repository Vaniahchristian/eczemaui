"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardLayout from "@/components/layout/dashboard-layout"
import DiagnosesHeader from "@/components/diagnoses/diagnoses-header"
import DiagnosesTimeline from "@/components/diagnoses/diagnoses-timeline"
import DiagnosisDetail from "@/components/diagnoses/diagnosis-detail"
import DiagnosesComparison from "@/components/diagnoses/diagnoses-comparison"
import DiagnosisTrends from "@/components/diagnoses/diagnosis-trends"

export type Diagnosis = {
  id: string
  date: string
  condition: string
  severity: "Mild" | "Moderate" | "Severe"
  location: string
  symptoms: string[]
  images: string[]
  notes: string
  treatment: string
  followUp: string
  doctor: string
  progress: number
}

interface DiagnosesPageProps {
  initialDiagnoses?: Diagnosis[]
}

export default function DiagnosesPage({ initialDiagnoses }: DiagnosesPageProps) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"detail" | "comparison" | "trends">("detail")
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    if (initialDiagnoses?.length) {
      setDiagnoses(initialDiagnoses)
      if (!selectedDiagnosis) {
        setSelectedDiagnosis(initialDiagnoses[0].id)
      }
    }
  }, [initialDiagnoses, selectedDiagnosis])

  // Find the selected diagnosis
  const currentDiagnosis = diagnoses?.find((d) => d.id === selectedDiagnosis) || diagnoses?.[0]

  if (!diagnoses?.length) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-gray-500">No diagnoses available</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-2xl mx-auto"
        >
          <DiagnosesHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <DiagnosesTimeline
                diagnoses={diagnoses}
                selectedId={selectedDiagnosis || (diagnoses[0]?.id ?? "")}
                onSelect={setSelectedDiagnosis}
              />
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-gray-800">
                  <nav className="flex space-x-4 px-6 py-4">
                    <button
                      onClick={() => setActiveTab("detail")}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === "detail"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setActiveTab("comparison")}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === "comparison"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => setActiveTab("trends")}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === "trends"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      Trends
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "detail" && currentDiagnosis && <DiagnosisDetail diagnosis={currentDiagnosis} />}
                  {activeTab === "comparison" && <DiagnosesComparison diagnoses={diagnoses} />}
                  {activeTab === "trends" && <DiagnosisTrends diagnoses={diagnoses} />}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
