"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PieChart, BarChart, Activity } from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export default function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState("age")

  const ageData = [
    { name: "0-10", value: 15 },
    { name: "11-20", value: 25 },
    { name: "21-30", value: 30 },
    { name: "31-40", value: 20 },
    { name: "41-50", value: 18 },
    { name: "51+", value: 12 },
  ]

  const regionData = [
    { name: "North America", value: 45 },
    { name: "Europe", value: 30 },
    { name: "Asia", value: 15 },
    { name: "Other", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border-none shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30">
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Eczema Analytics
        </h2>
        <div className="flex space-x-2 mt-3">
          <button
            className={`px-4 py-2 text-sm rounded-xl transition-all ${
              activeTab === "age" ? "bg-white text-sky-600 shadow-md" : "text-white/80 hover:bg-white/20"
            }`}
            onClick={() => setActiveTab("age")}
          >
            <BarChart className="h-4 w-4 inline-block mr-2" />
            Age Groups
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-xl transition-all ${
              activeTab === "region" ? "bg-white text-sky-600 shadow-md" : "text-white/80 hover:bg-white/20"
            }`}
            onClick={() => setActiveTab("region")}
          >
            <PieChart className="h-4 w-4 inline-block mr-2" />
            Geographical
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          {activeTab === "age" ? (
            <motion.div
              key="age"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#e2e8f0",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </RechartsBarChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div
              key="region"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#e2e8f0",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
          Data represents global eczema prevalence patterns based on anonymized user data.
        </p>
      </div>
    </div>
  )
}

