"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import type { Diagnosis } from "./diagnoses-page"

interface DiagnosesTimelineProps {
  diagnoses: Diagnosis[]
  selectedId?: string | null
  onSelect: (id: string) => void
}

export default function DiagnosesTimeline({ diagnoses, selectedId, onSelect }: DiagnosesTimelineProps) {
  // Sort diagnoses by date (newest first)
  const sortedDiagnoses = diagnoses?.length
    ? [...diagnoses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : []

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Mild":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "Moderate":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "Severe":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Mild":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "Moderate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "Severe":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
    }
  }

  if (!sortedDiagnoses?.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
          <h2 className="text-xl font-semibold">Diagnosis Timeline</h2>
          <p className="text-sm text-white/80 mt-1">No diagnoses available</p>
        </div>
        <div className="text-center p-8 text-gray-500">
          No diagnosis records found
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
        <h2 className="text-xl font-semibold">Diagnosis Timeline</h2>
        <p className="text-sm text-white/80 mt-1">Select a diagnosis to view details</p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {sortedDiagnoses.map((diagnosis, index) => (
            <motion.button
              key={diagnosis.id}
              onClick={() => onSelect(diagnosis.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedId === diagnosis.id
                  ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500"
                  : "hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{getSeverityIcon(diagnosis.severity)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {diagnosis.condition}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                      {new Date(diagnosis.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                        diagnosis.severity
                      )}`}
                    >
                      {diagnosis.severity}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{diagnosis.location}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{diagnosis.notes}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
