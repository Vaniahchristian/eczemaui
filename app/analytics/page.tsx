import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnalyticsControls from "@/components/analytics/analytics-controls"

// Initial static data
const initialStats = {
  totalPatients: 1250,
  totalDoctors: 45,
  activeConsultations: 78,
  diagnosesThisMonth: 342,
  patientGrowth: "+12%",
  avgResponseTime: "2.5 hours",
  patientSatisfaction: "4.8/5",
  topDiagnoses: [
    { name: "Atopic Dermatitis", count: 156 },
    { name: "Contact Dermatitis", count: 89 },
    { name: "Nummular Eczema", count: 67 },
    { name: "Dyshidrotic Eczema", count: 30 }
  ]
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <AnalyticsControls />

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialStats.totalPatients}</div>
            <p className="text-xs text-green-500">{initialStats.patientGrowth} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Doctors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialStats.totalDoctors}</div>
            <p className="text-xs text-gray-500">Across all specializations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialStats.activeConsultations}</div>
            <p className="text-xs text-gray-500">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Patient Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialStats.patientSatisfaction}</div>
            <p className="text-xs text-gray-500">Average rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Diagnoses This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initialStats.topDiagnoses.map((diagnosis, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{diagnosis.name}</span>
                  <span className="text-gray-500">{diagnosis.count} cases</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Average Response Time</span>
                <span className="text-gray-500">{initialStats.avgResponseTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Diagnoses This Month</span>
                <span className="text-gray-500">{initialStats.diagnosesThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">System Uptime</span>
                <span className="text-gray-500">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">API Performance</span>
                <span className="text-gray-500">245ms avg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
