"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample diagnoses data
const diagnoses = [
  {
    id: "diag-001",
    date: "2025-03-15",
    condition: "Atopic Dermatitis",
    severity: "Moderate",
    location: "Arms, neck",
    symptoms: ["Redness", "Itching", "Dry skin", "Inflammation"],
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    notes: "Patient reports increased itching at night and after showering. Environmental triggers may include pollen and stress.",
    treatment: "Prescribed hydrocortisone cream (1%) to be applied twice daily. Recommended daily moisturizing with fragrance-free lotion.",
    followUp: "2025-04-10",
    doctor: "Dr. Emily Chen",
    progress: 65
  },
  {
    id: "diag-002",
    date: "2025-02-20",
    condition: "Contact Dermatitis",
    severity: "Mild",
    location: "Hands",
    symptoms: ["Rash", "Mild itching", "Redness"],
    images: ["/placeholder.svg?height=300&width=400"],
    notes: "Reaction likely caused by new hand soap. Advised to switch to hypoallergenic products.",
    treatment: "Over-the-counter antihistamine and calamine lotion recommended.",
    followUp: "2025-03-20",
    doctor: "Dr. Michael Johnson",
    progress: 85
  }
]

export default function Diagnoses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Diagnoses History</h1>
        <Button>New Diagnosis</Button>
      </div>

      <div className="grid gap-4">
        {diagnoses.map((diagnosis) => (
          <Card key={diagnosis.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold">{diagnosis.condition}</h3>
                  <p className="text-sm text-gray-500">Date: {diagnosis.date}</p>
                  <p className="text-sm text-gray-500">Doctor: {diagnosis.doctor}</p>
                </div>
                <div>
                  <p className="font-medium">Location: {diagnosis.location}</p>
                  <Badge 
                    variant={diagnosis.severity === "Mild" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {diagnosis.severity}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm">Follow-up: {diagnosis.followUp}</p>
                  <p className="text-sm">Progress: {diagnosis.progress}%</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${diagnosis.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Treatment Plan</Button>
                  <Button variant="outline" size="sm">Update Progress</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
