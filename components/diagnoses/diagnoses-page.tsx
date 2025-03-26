"use client"

import { useState } from "react"
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

export default function DiagnosesPage({ initialDiagnoses = [] }: DiagnosesPageProps) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"detail" | "comparison" | "trends">("detail")
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(initialDiagnoses)

  // Find the selected diagnosis
  const currentDiagnosis = diagnoses.find((d) => d.id === selectedDiagnosis) || diagnoses[0]

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
                selectedId={selectedDiagnosis || diagnoses[0].id}
                onSelect={setSelectedDiagnosis}
              />
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30">
                <div className="border-b border-slate-200 dark:border-slate-700">
                  <div className="flex space-x-1 p-4">
                    <button
                      onClick={() => setActiveTab("detail")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === "detail"
                          ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      Diagnosis Details
                    </button>
                    <button
                      onClick={() => setActiveTab("comparison")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === "comparison"
                          ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      Compare Diagnoses
                    </button>
                    <button
                      onClick={() => setActiveTab("trends")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === "trends"
                          ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      Trends & Analytics
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "detail" && <DiagnosisDetail diagnosis={currentDiagnosis} />}
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
