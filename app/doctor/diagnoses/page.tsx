"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DoctorDiagnoses() {
  const dummyDiagnoses = [
    {
      id: 1,
      patientName: "John Smith",
      date: "2025-03-25",
      severity: "Moderate",
      type: "Atopic Dermatitis",
      location: "Arms and neck",
      notes: "Showing improvement with prescribed treatment"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      date: "2025-03-24",
      severity: "Severe",
      type: "Nummular Eczema",
      location: "Legs",
      notes: "Requires adjustment to current medication"
    },
    {
      id: 3,
      patientName: "Michael Brown",
      date: "2025-03-23",
      severity: "Mild",
      type: "Contact Dermatitis",
      location: "Hands",
      notes: "Allergic reaction to new soap"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patient Diagnoses</h1>
        <Button>New Diagnosis</Button>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Search Diagnoses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="patient">Patient Name</Label>
                <Input id="patient" placeholder="Search by patient name" />
              </div>
              <div>
                <Label htmlFor="date">Date Range</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input id="type" placeholder="Filter by type" />
              </div>
            </div>
          </CardContent>
        </Card>

        {dummyDiagnoses.map((diagnosis) => (
          <Card key={diagnosis.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-semibold">{diagnosis.patientName}</p>
                  <p className="text-sm text-gray-500">{diagnosis.date}</p>
                </div>
                <div>
                  <p className="font-semibold">{diagnosis.type}</p>
                  <p className="text-sm text-gray-500">Severity: {diagnosis.severity}</p>
                </div>
                <div>
                  <p className="font-semibold">Location: {diagnosis.location}</p>
                  <p className="text-sm text-gray-500">{diagnosis.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
