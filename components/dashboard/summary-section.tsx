"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Pill, CheckCircle } from "lucide-react"

export default function SummarySection() {
  const diagnoses = [
    {
      id: 1,
      date: "May 15, 2023",
      condition: "Atopic Dermatitis",
      severity: "Moderate",
      location: "Arms, neck",
    },
    {
      id: 2,
      date: "April 2, 2023",
      condition: "Contact Dermatitis",
      severity: "Mild",
      location: "Hands",
    },
  ]

  const appointments = [
    {
      id: 1,
      date: "June 10, 2023",
      time: "10:30 AM",
      doctor: "Dr. Emily Chen",
      type: "Follow-up",
    },
  ]

  const treatments = [
    {
      id: 1,
      name: "Hydrocortisone Cream",
      instructions: "Apply twice daily to affected areas",
      prescribed: "May 15, 2023",
    },
    {
      id: 2,
      name: "Moisturizing Lotion",
      instructions: "Apply after shower and before bed",
      prescribed: "May 15, 2023",
    },
    {
      id: 3,
      name: "Antihistamine",
      instructions: "Take one tablet daily for itching",
      prescribed: "May 15, 2023",
    },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border-none shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30">
      <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white p-6">
        <h2 className="text-xl font-semibold flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          Health Summary
        </h2>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium flex items-center">
            <Clock className="mr-2 h-5 w-5 text-sky-500" />
            Recent Diagnoses
          </h3>
          <div className="mt-3 space-y-3">
            {diagnoses.map((diagnosis, index) => (
              <motion.div
                key={diagnosis.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{diagnosis.condition}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{diagnosis.date}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      diagnosis.severity === "Mild"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : diagnosis.severity === "Moderate"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {diagnosis.severity}
                  </span>
                  <span className="ml-2 text-slate-500 dark:text-slate-400">Location: {diagnosis.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-sky-500" />
            Upcoming Appointments
          </h3>
          <div className="mt-3 space-y-3">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{appointment.type}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {appointment.date}, {appointment.time}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">With {appointment.doctor}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium flex items-center">
            <Pill className="mr-2 h-5 w-5 text-sky-500" />
            Treatment Recommendations
          </h3>
          <div className="mt-3 space-y-3">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{treatment.name}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Prescribed: {treatment.prescribed}</span>
                </div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{treatment.instructions}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

