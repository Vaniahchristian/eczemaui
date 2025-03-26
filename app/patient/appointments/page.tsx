"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppointmentControls from "@/components/appointments/appointment-controls"

// Initial static data for patient appointments
const patientAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    date: "2025-03-26",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
    location: "Main Clinic",
    notes: "Regular checkup for eczema treatment progress"
  },
  {
    id: 2,
    doctorName: "Dr. Michael Brown",
    specialty: "Allergist",
    date: "2025-03-28",
    time: "02:30 PM",
    type: "Consultation",
    status: "Pending",
    location: "Virtual",
    notes: "Discussion about allergy triggers"
  }
]

export default function PatientAppointments() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Appointments</h1>
      </div>

      <AppointmentControls />

      <div className="grid gap-4">
        {patientAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{appointment.doctorName}</h3>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                  <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Date & Time</p>
                    <p className="text-sm text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-500">{appointment.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-gray-500">{appointment.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
