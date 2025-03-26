"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Bell, MessageSquare, Calendar } from "lucide-react"
import SummarySection from "./summary-section"
import AnalyticsSection from "./analytics-section"
import UploadSection from "./upload-section"
import AppointmentWidget from "./appointment-widget"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome Back, Emma!</h1>
          <p className="text-gray-500">Here's what's happening with your eczema treatment.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button>
            <Calendar className="h-5 w-5 mr-2" />
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/90">Treatment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">75%</div>
            <div className="mt-2 h-2 bg-blue-700/50 rounded-full">
              <div className="h-full w-3/4 bg-white rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/90">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white">Tomorrow</div>
            <div className="text-sm text-white/90">10:30 AM with Dr. Chen</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/90">Symptom Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Low</div>
            <div className="text-sm text-white/90">Improved by 30%</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/90">Medication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white">2 Days Left</div>
            <div className="text-sm text-white/90">Current prescription</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Summary and Analytics */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SummarySection />
          <AnalyticsSection />
        </motion.div>

        {/* Right Column - Upload and Appointment */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UploadSection setIsLoading={setIsLoading} />
          <AppointmentWidget />
        </motion.div>
      </div>

      {/* AI Assistant */}
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button className="rounded-full px-6 py-6 shadow-lg bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600">
          <Sparkles className="h-5 w-5 mr-2" />
          AI Assistant
        </Button>
      </motion.div>
    </div>
  )
}
