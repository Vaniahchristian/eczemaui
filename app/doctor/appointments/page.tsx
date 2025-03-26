"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export default function DoctorAppointments() {
  const dummyAppointments = [
    {
      id: 1,
      patientName: "Emma Wilson",
      date: "2025-03-26",
      time: "09:00 AM",
      type: "Follow-up",
      status: "Confirmed"
    },
    {
      id: 2,
      patientName: "James Anderson",
      date: "2025-03-26",
      time: "10:30 AM",
      type: "Initial Consultation",
      status: "Confirmed"
    },
    {
      id: 3,
      patientName: "Lisa Thompson",
      date: "2025-03-26",
      time: "02:00 PM",
      type: "Emergency",
      status: "Pending"
    }
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Button>Schedule Appointment</Button>
        </div>

        <div className="space-y-4">
          {dummyAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                  <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Start Consultation</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
