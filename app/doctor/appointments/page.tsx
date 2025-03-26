"use server"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AppointmentControls from "@/components/appointments/appointment-controls"

// Initial static data for doctor view
const doctorAppointments = [
  {
    id: 1,
    patientName: "Emma Wilson",
    patientId: "P-1234",
    date: "2025-03-26",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
    condition: "Atopic Dermatitis",
    lastVisit: "2025-02-26"
  },
  {
    id: 2,
    patientName: "James Anderson",
    patientId: "P-1235",
    date: "2025-03-26",
    time: "10:30 AM",
    type: "Initial Consultation",
    status: "Confirmed",
    condition: "Suspected Contact Dermatitis",
    lastVisit: null
  },
  {
    id: 3,
    patientName: "Lisa Thompson",
    patientId: "P-1236",
    date: "2025-03-26",
    time: "02:00 PM",
    type: "Emergency",
    status: "Pending",
    condition: "Severe Flare-up",
    lastVisit: "2025-03-20"
  }
]

export default async function DoctorAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Patient Appointments</h1>
      </div>

      <AppointmentControls />

      <div className="grid gap-4">
        {doctorAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-500">ID: {appointment.patientId}</p>
                  {appointment.lastVisit && (
                    <p className="text-xs text-gray-500">Last Visit: {appointment.lastVisit}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                  <p className="text-xs text-gray-500">{appointment.type}</p>
                </div>
                <div>
                  <p className="font-medium">Condition</p>
                  <p className="text-sm text-gray-500">{appointment.condition}</p>
                  <Badge 
                    variant={appointment.status === "Confirmed" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm">Start Consultation</Button>
                  <Button variant="outline" size="sm">View History</Button>
                  <Button variant="outline" size="sm">Reschedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
