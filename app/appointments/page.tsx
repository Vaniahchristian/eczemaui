"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppointmentControls from "../../components/appointments/appointment-controls"

// Initial static data
const initialAppointments = [
  {
    id: 1,
    patientName: "Emma Wilson",
    date: "2025-03-26",
    time: "09:00 AM",
    doctorName: "Dr. Sarah Chen",
    type: "Follow-up",
    status: "Confirmed",
    location: "Main Clinic"
  },
  {
    id: 2,
    patientName: "James Anderson",
    date: "2025-03-26",
    time: "10:30 AM",
    doctorName: "Dr. Michael Brown",
    type: "Initial Consultation",
    status: "Confirmed",
    location: "Virtual"
  },
  {
    id: 3,
    patientName: "Lisa Thompson",
    date: "2025-03-26",
    time: "02:00 PM",
    doctorName: "Dr. Sarah Chen",
    type: "Emergency",
    status: "Pending",
    location: "Main Clinic"
  }
]

export default function Appointments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
      </div>

      <AppointmentControls />

      <div className="grid gap-4">
        {initialAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-500">{appointment.doctorName}</p>
                </div>
                <div>
                  <p className="font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
                <div>
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-gray-500">{appointment.location}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={appointment.status === "Confirmed" ? "default" : "secondary"}
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
