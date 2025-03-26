"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AppointmentControls from "@/components/appointments/appointment-controls"

// Initial static data for admin view
const adminAppointments = [
  {
    id: 1,
    patientName: "Emma Wilson",
    doctorName: "Dr. Sarah Chen",
    date: "2025-03-26",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
    location: "Main Clinic",
    department: "Dermatology"
  },
  {
    id: 2,
    patientName: "James Anderson",
    doctorName: "Dr. Michael Brown",
    date: "2025-03-26",
    time: "10:30 AM",
    type: "Initial Consultation",
    status: "Confirmed",
    location: "Virtual",
    department: "Allergy"
  },
  {
    id: 3,
    patientName: "Lisa Thompson",
    doctorName: "Dr. Sarah Chen",
    date: "2025-03-26",
    time: "02:00 PM",
    type: "Emergency",
    status: "Pending",
    location: "Main Clinic",
    department: "Dermatology"
  }
]

export default function AdminAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments Management</h1>
      </div>

      <AppointmentControls />

      <div className="grid gap-4">
        {adminAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-500">{appointment.doctorName}</p>
                  <p className="text-xs text-gray-500">{appointment.department}</p>
                </div>
                <div>
                  <p className="font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                  <p className="text-xs text-gray-500">{appointment.location}</p>
                </div>
                <div>
                  <p className="font-medium">{appointment.type}</p>
                  <Badge 
                    variant={appointment.status === "Confirmed" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                  {appointment.status === "Pending" && (
                    <Button size="sm">Confirm</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
