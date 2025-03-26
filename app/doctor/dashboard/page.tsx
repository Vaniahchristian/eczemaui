"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample data for doctor's dashboard
const todayAppointments = [
  {
    id: 1,
    patientName: "Emma Wilson",
    time: "09:00 AM",
    type: "Follow-up",
    condition: "Atopic Dermatitis"
  },
  {
    id: 2,
    patientName: "James Anderson",
    time: "10:30 AM",
    type: "Initial Consultation",
    condition: "Contact Dermatitis"
  }
]

const stats = {
  totalPatients: 128,
  appointmentsToday: 8,
  pendingReports: 3,
  averageRating: 4.8
}

const recentDiagnoses = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "2025-03-25",
    condition: "Seborrheic Dermatitis",
    severity: "Moderate"
  },
  {
    id: 2,
    patientName: "Michael Brown",
    date: "2025-03-25",
    condition: "Psoriasis",
    severity: "Mild"
  }
]

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <Button>Start Consultation</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{appointment.patientName}</p>
                  <p className="text-sm text-gray-500">{appointment.condition}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{appointment.time}</p>
                  <Badge variant="outline">{appointment.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Diagnoses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDiagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{diagnosis.patientName}</p>
                  <p className="text-sm text-gray-500">{diagnosis.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{diagnosis.date}</p>
                  <Badge 
                    variant={diagnosis.severity === "Mild" ? "default" : "secondary"}
                  >
                    {diagnosis.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
