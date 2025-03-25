"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LogHealthData() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("physical");
  const [itchLevel, setItchLevel] = useState([3]);
  const [painLevel, setPainLevel] = useState([2]);
  const [stressLevel, setStressLevel] = useState([4]);
  const [sleepQuality, setSleepQuality] = useState([7]);
  const [moodLevel, setMoodLevel] = useState([6]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Health data logged successfully!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Log Health Data</h2>
          <p className="text-muted-foreground">Record your daily health metrics</p>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="eczema">Eczema</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="physical" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="steps">Steps</Label>
                <Input id="steps" type="number" placeholder="e.g., 8,500" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="active-minutes">Active Minutes</Label>
                <Input id="active-minutes" type="number" placeholder="e.g., 45" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exercise-type">Exercise Type</Label>
                <Select>
                  <SelectTrigger id="exercise-type">
                    <SelectValue placeholder="Select exercise type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="cycling">Cycling</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="eczema" className="space-y-4 pt-4">
          {/* Eczema tracking content */}
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-4 pt-4">
          {/* Nutrition tracking content */}
        </TabsContent>
        
        <TabsContent value="sleep" className="space-y-4 pt-4">
          {/* Sleep tracking content */}
        </TabsContent>
        
        <TabsContent value="mood" className="space-y-4 pt-4">
          {/* Mood tracking content */}
        </TabsContent>
        
        <TabsContent value="medication" className="space-y-4 pt-4">
          {/* Medication tracking content */}
        </TabsContent>
      </Tabs>
      
      <Button onClick={handleSubmit} className="w-full">Save Health Data</Button>
    </div>
  );
}
