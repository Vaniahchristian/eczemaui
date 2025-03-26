"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample data
const patients = [
  {
    id: "P-1234",
    name: "Emma Wilson",
    age: 34,
    condition: "Atopic Dermatitis",
    lastVisit: "2025-02-26",
    nextAppointment: "2025-03-26",
    status: "Active",
    severity: "Moderate"
  },
  {
    id: "P-1235",
    name: "James Anderson",
    age: 28,
    condition: "Contact Dermatitis",
    lastVisit: "2025-03-01",
    nextAppointment: "2025-03-29",
    status: "Active",
    severity: "Mild"
  }
]

export default function DoctorPatients() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Patients</h1>
        <Button>Add New Patient</Button>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <Card key={patient.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold">{patient.name}</h3>
                  <p className="text-sm text-gray-500">ID: {patient.id}</p>
                  <p className="text-sm text-gray-500">Age: {patient.age}</p>
                </div>
                <div>
                  <p className="font-medium">{patient.condition}</p>
                  <Badge 
                    variant={patient.severity === "Mild" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {patient.severity}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm">Last Visit: {patient.lastVisit}</p>
                  <p className="text-sm">Next: {patient.nextAppointment}</p>
                  <Badge 
                    variant={patient.status === "Active" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Medical History</Button>
                  <Button variant="outline" size="sm">Schedule Visit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}