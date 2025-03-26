"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AppointmentControls() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("calendar")
  const [filter, setFilter] = useState("all")

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Select value={view} onValueChange={setView}>
                <SelectTrigger>
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Calendar View</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter appointments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Appointments</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" size="sm">Today</Button>
              <Button variant="outline" size="sm">This Week</Button>
              <Button variant="outline" size="sm">This Month</Button>
            </div>
            <Button>Schedule Appointment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
